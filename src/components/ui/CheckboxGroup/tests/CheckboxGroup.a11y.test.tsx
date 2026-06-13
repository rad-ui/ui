import React from 'react';
import { render } from '@testing-library/react';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import CheckboxGroup from '../CheckboxGroup';

describe('CheckboxGroup accessibility', () => {
    test('axe: no violations', async() => {
        const { container } = render(
            <CheckboxGroup.Root name="fruits">
                <CheckboxGroup.Label>
                    <CheckboxGroup.Trigger value="apple">
                        <CheckboxGroup.Indicator />
                    </CheckboxGroup.Trigger>
          Apple
                </CheckboxGroup.Label>
            </CheckboxGroup.Root>
        );
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });
});
