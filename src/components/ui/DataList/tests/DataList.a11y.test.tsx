import React from 'react';
import { render } from '@testing-library/react';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import DataList from '../DataList';

describe('DataList accessibility', () => {
    test('axe: no violations', async() => {
        const { container } = render(
            <DataList.Root>
                <DataList.Item>
                    <DataList.Label>Name</DataList.Label>
                    <DataList.Value>John</DataList.Value>
                </DataList.Item>
            </DataList.Root>
        );
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });
});
