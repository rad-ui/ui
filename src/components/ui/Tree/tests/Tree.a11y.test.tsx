import React from 'react';
import { render } from '@testing-library/react';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import Tree from '../Tree';

describe('Tree accessibility', () => {
    test('axe: no violations', async() => {
        const { container } = render(<Tree>Test</Tree>);
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });

    test('axe: no violations for a nested Tree.Root (no aria-orientation on a generic wrapper)', async() => {
        const item = { label: 'src', expanded: true, items: [{ label: 'index.ts' }, { label: 'App.tsx' }] };
        const { container } = render(
            <Tree.Root aria-label='Files'>
                <Tree.Item item={item}>{item.label}</Tree.Item>
                <Tree.Item item={{ label: 'package.json' }}>package.json</Tree.Item>
            </Tree.Root>
        );
        expect(container.querySelector('[aria-orientation]')).toHaveAttribute('role', 'tree');
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });
});
