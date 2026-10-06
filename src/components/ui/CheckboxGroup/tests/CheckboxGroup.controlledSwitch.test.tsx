import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CheckboxGroup from '../CheckboxGroup';

describe('CheckboxGroup controlled switch', () => {
    const items = (
        <>
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
        </>
    );

    const group = (rootProps: Partial<React.ComponentProps<typeof CheckboxGroup.Root>>) => (
        <CheckboxGroup.Root name="fruits" {...rootProps}>
            {items}
        </CheckboxGroup.Root>
    );

    test('switches from uncontrolled defaultValue to controlled value', async() => {
        const user = userEvent.setup();
        const onValueChange = jest.fn();

        const { rerender } = render(group({ defaultValue: ['apple'] }));

        expect(screen.getByRole('checkbox', { name: 'Apple' })).toHaveAttribute('aria-checked', 'true');

        rerender(group({ value: ['banana'], onValueChange }));

        expect(screen.getByRole('checkbox', { name: 'Banana' })).toHaveAttribute('aria-checked', 'true');

        await user.click(screen.getByRole('checkbox', { name: 'Apple' }));
        expect(onValueChange).toHaveBeenCalledWith(['banana', 'apple']);
    });

    test('switches from controlled value to uncontrolled defaultValue', async() => {
        const user = userEvent.setup();

        const { unmount } = render(group({ value: ['banana'], onValueChange: () => {} }));

        expect(screen.getByRole('checkbox', { name: 'Banana' })).toHaveAttribute('aria-checked', 'true');
        unmount();

        render(group({ defaultValue: ['apple'] }));

        expect(screen.getByRole('checkbox', { name: 'Apple' })).toHaveAttribute('aria-checked', 'true');

        await user.click(screen.getByRole('checkbox', { name: 'Banana' }));
        expect(screen.getByRole('checkbox', { name: 'Banana' })).toHaveAttribute('aria-checked', 'true');
    });
});
