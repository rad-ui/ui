import React from 'react';
import { render } from '@testing-library/react';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import Theme from '../Theme';

describe('Theme accessibility', () => {
    beforeAll(() => {
        // jsdom lacks matchMedia
        // @ts-ignore
        window.matchMedia = window.matchMedia || function() {
            return {
                matches: false,
                addEventListener: () => {},
                removeEventListener: () => {}
            } as any;
        };
    });
    test('axe: no violations', async() => {
        const { container } = render(<Theme>Test</Theme>);
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });
});
