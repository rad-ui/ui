import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import NumberField from '../NumberField';

describe('NumberField controlled switch', () => {
    const numberField = (rootProps: Partial<React.ComponentProps<typeof NumberField.Root>>) => (
        <NumberField.Root step={1} {...rootProps}>
            <NumberField.Decrement>-</NumberField.Decrement>
            <NumberField.Input aria-label="Amount" />
            <NumberField.Increment>+</NumberField.Increment>
        </NumberField.Root>
    );

    test('switches from uncontrolled defaultValue to controlled value', () => {
        const onValueChange = jest.fn();

        const { rerender } = render(numberField({ defaultValue: 1 }));

        expect(screen.getByRole('spinbutton')).toHaveValue(1);

        rerender(numberField({ value: 5, onValueChange }));

        expect(screen.getByRole('spinbutton')).toHaveValue(5);

        fireEvent.click(screen.getByRole('button', { name: '+' }));
        expect(onValueChange).toHaveBeenCalled();
    });

    test('switches from controlled value to uncontrolled defaultValue', () => {
        const { rerender } = render(numberField({ value: 3, onValueChange: () => {} }));

        expect(screen.getByRole('spinbutton')).toHaveValue(3);

        rerender(numberField({ value: 7, onValueChange: () => {} }));
        expect(screen.getByRole('spinbutton')).toHaveValue(7);

        rerender(numberField({ defaultValue: 7 }));

        const input = screen.getByRole('spinbutton');
        fireEvent.change(input, { target: { value: '7' } });
        expect(input).toHaveValue(7);
    });
});
