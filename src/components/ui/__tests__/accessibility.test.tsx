import { render, waitFor } from '@testing-library/react';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import { componentTrees } from '../tests/componentTrees';

// Every component, open where it can start open, has no WCAG 2.1 A/AA
// violations axe can find. The whole document is checked so portaled parts count.
describe('accessibility of every component', () => {
    test.each(componentTrees)('%s', async(_name, make) => {
        render(make());
        // Let focus managers and positioning settle.
        await waitFor(() => new Promise((resolve) => setTimeout(resolve, 20)));
        const results = await axe.run(document.body, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        const summary = results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.html.slice(0, 120)).join(' | ')}`);
        expect(summary).toEqual([]);
    });
});
