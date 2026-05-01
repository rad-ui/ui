import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import NumberField from '../NumberField';

describe('NumberField', () => {
    test('forwards refs to underlying elements', () => {
        const rootRef = React.createRef<HTMLDivElement>();
        const inputRef = React.createRef<HTMLInputElement>();
        const incRef = React.createRef<HTMLButtonElement>();
        const decRef = React.createRef<HTMLButtonElement>();

        render(
            <NumberField.Root ref={rootRef}>
                <NumberField.Decrement ref={decRef}>-</NumberField.Decrement>
                <NumberField.Input ref={inputRef} aria-label="value" />
                <NumberField.Increment ref={incRef}>+</NumberField.Increment>
            </NumberField.Root>
        );

        expect(rootRef.current).toBeInstanceOf(HTMLDivElement);
        expect(inputRef.current).toBeInstanceOf(HTMLInputElement);
        expect(incRef.current).toBeInstanceOf(HTMLButtonElement);
        expect(decRef.current).toBeInstanceOf(HTMLButtonElement);
    });

    test('supports accessibility attributes', () => {
        render(
            <NumberField.Root>
                <NumberField.Decrement>-</NumberField.Decrement>
                <NumberField.Input aria-label="Quantity" />
                <NumberField.Increment>+</NumberField.Increment>
            </NumberField.Root>
        );

        expect(screen.getByLabelText('Quantity')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument();
    });

    test('keeps stepper buttons out of the tab order while preserving pointer clicks', () => {
        render(
            <NumberField.Root defaultValue={3} step={1}>
                <NumberField.Decrement>-</NumberField.Decrement>
                <NumberField.Input aria-label="value" />
                <NumberField.Increment>+</NumberField.Increment>
            </NumberField.Root>
        );

        const input = screen.getByLabelText('value') as HTMLInputElement;
        const increment = screen.getByRole('button', { name: '+' });
        const decrement = screen.getByRole('button', { name: '-' });

        expect(input).not.toHaveAttribute('tabindex');
        expect(increment).toHaveAttribute('tabindex', '-1');
        expect(decrement).toHaveAttribute('tabindex', '-1');

        fireEvent.click(increment);
        expect(input).toHaveValue(4);

        fireEvent.click(decrement);
        expect(input).toHaveValue(3);
    });

    test('renders without warnings', () => {
        const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const error = jest.spyOn(console, 'error').mockImplementation(() => {});

        render(
            <NumberField.Root>
                <NumberField.Decrement>-</NumberField.Decrement>
                <NumberField.Input aria-label="value" />
                <NumberField.Increment>+</NumberField.Increment>
            </NumberField.Root>
        );

        expect(warn).not.toHaveBeenCalled();
        expect(error).not.toHaveBeenCalled();

        warn.mockRestore();
        error.mockRestore();
    });
});
