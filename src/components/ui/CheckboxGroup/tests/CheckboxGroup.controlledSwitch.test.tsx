import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CheckboxGroup from '../CheckboxGroup';

const fruitGroup = (props: React.ComponentProps<typeof CheckboxGroup.Root>) => (
    <CheckboxGroup.Root name="fruits" {...props}>
        <CheckboxGroup.Label>
            <CheckboxGroup.Trigger value="apple">
                <CheckboxGroup.Indicator />
            </CheckboxGroup.Trigger>
            Apple
        </CheckboxGroup.Label>
        <CheckboxGroup.Label>
            <CheckboxGroup.Trigger value="banana">
                <CheckboxGroup.Indicator />
            </CheckboxGroup.Trigger>
            Banana
        </CheckboxGroup.Label>
    </CheckboxGroup.Root>
);

describe('CheckboxGroup controlled/uncontrolled mode switching', () => {
    test('switches from uncontrolled to controlled', () => {
        const onValueChange = jest.fn();

        const { rerender } = render(fruitGroup({ defaultValue: ['apple'] }));

        const bananaCheckbox = screen.getByRole('checkbox', { name: 'Banana' });
        fireEvent.click(bananaCheckbox);
        expect(bananaCheckbox).toHaveAttribute('aria-checked', 'true');

        rerender(fruitGroup({ value: ['apple'], onValueChange }));

        expect(screen.getByRole('checkbox', { name: 'Banana' })).toHaveAttribute('aria-checked', 'false');
        fireEvent.click(bananaCheckbox);
        expect(onValueChange).toHaveBeenCalledWith(['apple', 'banana']);
    });

    test('switches from controlled to uncontrolled', () => {
        const { rerender } = render(fruitGroup({ defaultValue: ['apple'] }));

        rerender(fruitGroup({ value: ['banana'], onValueChange: () => {} }));
        expect(screen.getByRole('checkbox', { name: 'Banana' })).toHaveAttribute('aria-checked', 'true');

        rerender(fruitGroup({ defaultValue: ['apple'] }));

        expect(screen.getByRole('checkbox', { name: 'Apple' })).toHaveAttribute('aria-checked', 'true');
        fireEvent.click(screen.getByRole('checkbox', { name: 'Banana' }));
        expect(screen.getByRole('checkbox', { name: 'Banana' })).toHaveAttribute('aria-checked', 'true');
    });
});
