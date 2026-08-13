import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import RadioCards from '../RadioCards';

describe('RadioCards controlled switch', () => {
    const radioCards = (rootProps: Partial<React.ComponentProps<typeof RadioCards.Root>>) => (
        <RadioCards.Root name="plan" {...rootProps}>
            <RadioCards.Item value="basic" data-testid="basic">Basic</RadioCards.Item>
            <RadioCards.Item value="pro" data-testid="pro">Pro</RadioCards.Item>
        </RadioCards.Root>
    );

    test('switches from uncontrolled defaultValue to controlled value', () => {
        const onValueChange = jest.fn();

        const { rerender } = render(radioCards({ defaultValue: 'basic' }));

        expect(screen.getByTestId('basic')).toHaveAttribute('aria-checked', 'true');

        rerender(radioCards({ value: 'pro', onValueChange }));

        expect(screen.getByTestId('pro')).toHaveAttribute('aria-checked', 'true');

        fireEvent.click(screen.getByTestId('basic'));
        expect(onValueChange).toHaveBeenCalledWith('basic');
    });

    test('switches from controlled value to uncontrolled defaultValue', () => {
        const { rerender } = render(radioCards({ defaultValue: 'basic' }));

        rerender(radioCards({ value: 'pro' }));
        expect(screen.getByTestId('pro')).toHaveAttribute('aria-checked', 'true');

        rerender(radioCards({ defaultValue: 'basic' }));
        expect(screen.getByTestId('basic')).toHaveAttribute('aria-checked', 'true');
    });
});
