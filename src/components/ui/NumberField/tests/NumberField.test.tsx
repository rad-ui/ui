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

    test('exposes stable part and validation state attributes', () => {
        render(
            <NumberField.Root data-testid="root" defaultValue={2} required invalid data-slot="custom-root" data-invalid={undefined}>
                <NumberField.Decrement data-slot="custom-decrement">-</NumberField.Decrement>
                <NumberField.Input aria-label="Quantity" />
                <NumberField.Increment data-slot="custom-increment">+</NumberField.Increment>
            </NumberField.Root>
        );

        const root = screen.getByTestId('root');
        const input = screen.getByLabelText('Quantity');
        const increment = screen.getByRole('button', { name: '+' });
        const decrement = screen.getByRole('button', { name: '-' });

        expect(root).toHaveAttribute('data-slot', 'number-field-root');
        expect(root).toHaveAttribute('data-required');
        expect(root).toHaveAttribute('data-invalid');
        expect(input).toHaveAttribute('data-slot', 'number-field-input');
        expect(input).toHaveAttribute('data-required');
        expect(input).toHaveAttribute('data-invalid');
        expect(input).toHaveAttribute('aria-invalid', 'true');
        expect(increment).toHaveAttribute('data-slot', 'number-field-increment');
        expect(decrement).toHaveAttribute('data-slot', 'number-field-decrement');
    });

    test('lets consumers override input aria-invalid when composing validation themselves', () => {
        render(
            <NumberField.Root invalid>
                <NumberField.Input aria-label="Quantity" aria-invalid={false} />
            </NumberField.Root>
        );

        expect(screen.getByLabelText('Quantity')).toHaveAttribute('aria-invalid', 'false');
        expect(screen.getByLabelText('Quantity')).toHaveAttribute('data-invalid');
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
