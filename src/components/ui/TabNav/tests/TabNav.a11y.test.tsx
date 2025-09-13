import React from 'react';
import { render } from '@testing-library/react';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import TabNav from '../TabNav';

describe('TabNav accessibility', () => {
    test('axe: no violations', async() => {
        const { container } = render(
            <TabNav.Root>
                <TabNav.Link value="tab1">Tab 1</TabNav.Link>
            </TabNav.Root>
        );
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });
});
