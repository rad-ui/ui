import React from 'react';
import { render } from '@testing-library/react';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import CheckboxCards from '../CheckboxCards';

describe('CheckboxCards accessibility', () => {
    test('axe: no violations', async() => {
        const { container } = render(
            <CheckboxCards.Root name="fruits">
                <CheckboxCards.Item value="apple">
                    <CheckboxCards.Content>
                        <CheckboxCards.Indicator />
                    </CheckboxCards.Content>
          Apple
                </CheckboxCards.Item>
            </CheckboxCards.Root>
        );
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });
});
