import React from 'react';
import { act } from '@testing-library/react';
import { expectNoUnexpectedHydrationWarnings, flush, hydrateRoot, renderToString } from '../tests/ssrHydration';
import { componentTrees } from '../tests/componentTrees';

// Server HTML for every component hydrates without React warnings: no id,
// attribute or text mismatches between the server render and the first client
// render.

describe('server HTML hydrates without warnings', () => {
    test.each(componentTrees)('%s', async(_name, make) => {
        const html = renderToString(make());
        const container = document.createElement('div');
        container.innerHTML = html;
        document.body.appendChild(container);

        const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const error = jest.spyOn(console, 'error').mockImplementation(() => {});
        let root: { unmount: () => void } | undefined;
        try {
            await act(async() => {
                root = hydrateRoot(container, make());
                await flush();
            });
            expectNoUnexpectedHydrationWarnings(warn, error);
        } finally {
            warn.mockRestore();
            error.mockRestore();
            act(() => root?.unmount());
            container.remove();
        }
    });
});
