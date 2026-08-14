import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CheckboxCards from '../CheckboxCards';

describe('CheckboxCards controlled switch', () => {
    const items = (
        <>
            <CheckboxCards.Item value="apple">
                Apple
                <CheckboxCards.Content>
                    <CheckboxCards.Indicator />
                </CheckboxCards.Content>
            </CheckboxCards.Item>
            <CheckboxCards.Item value="banana">
                Banana
                <CheckboxCards.Content>
                    <CheckboxCards.Indicator />
                </CheckboxCards.Content>
            </CheckboxCards.Item>
        </>
    );

    const card = (rootProps: Partial<React.ComponentProps<typeof CheckboxCards.Root>>) => (
        <CheckboxCards.Root name="fruits" {...rootProps}>
            {items}
        </CheckboxCards.Root>
    );

    test('switches from uncontrolled defaultValue to controlled value', async() => {
        const user = userEvent.setup();
        const onValueChange = jest.fn();

        const { rerender } = render(card({ defaultValue: ['apple'] }));

        expect(screen.getByText('Apple').closest('button[aria-checked]')).toHaveAttribute('aria-checked', 'true');

        rerender(card({ value: ['banana'], onValueChange }));

        expect(screen.getByText('Banana').closest('button[aria-checked]')).toHaveAttribute('aria-checked', 'true');

        await user.click(screen.getByText('Apple').closest('button[aria-checked]') as HTMLElement);
        expect(onValueChange).toHaveBeenCalledWith(['banana', 'apple']);
    });

    test('switches from controlled value to uncontrolled defaultValue', async() => {
        const user = userEvent.setup();

        const { unmount } = render(card({ value: ['banana'], onValueChange: () => {} }));

        expect(screen.getByText('Banana').closest('button[aria-checked]')).toHaveAttribute('aria-checked', 'true');
        unmount();

        render(card({ defaultValue: ['apple'] }));

        expect(screen.getByText('Apple').closest('button[aria-checked]')).toHaveAttribute('aria-checked', 'true');

        await user.click(screen.getByText('Banana').closest('button[aria-checked]') as HTMLElement);
        expect(screen.getByText('Banana').closest('button[aria-checked]')).toHaveAttribute('aria-checked', 'true');
    });
});
