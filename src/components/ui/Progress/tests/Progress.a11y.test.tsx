import React from 'react';
import { render } from '@testing-library/react';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import Progress from '../Progress';

describe('Progress accessibility', () => {
    test('axe: no violations', async() => {
        const { container } = render(
            <Progress.Root value={50} minValue={0} maxValue={100}>
                <Progress.Indicator />
            </Progress.Root>
        );
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });
});
