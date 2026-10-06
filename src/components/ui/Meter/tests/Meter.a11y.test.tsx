import React from 'react';
import { render } from '@testing-library/react';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import Meter from '../Meter';

describe('Meter accessibility', () => {
    test('axe: no violations', async() => {
        const { container } = render(
            <Meter.Root value={65} minValue={0} maxValue={100} lowValue={30} highValue={85}>
                <Meter.Indicator />
            </Meter.Root>
        );
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });
});
