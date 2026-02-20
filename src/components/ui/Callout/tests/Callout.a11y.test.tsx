import React from 'react';
import { render } from '@testing-library/react';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import Callout from '../Callout';

describe('Callout accessibility', () => {
    test('axe: no violations', async() => {
        const { container } = render(
            <Callout.Root>
                <Callout.Icon>i</Callout.Icon>
                <Callout.Text>Test</Callout.Text>
            </Callout.Root>
        );
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });
});
