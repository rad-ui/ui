import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberField from '../NumberField';
import { parseFormattedNumber } from '../utils/numberFormat';

const Price = (props: Partial<React.ComponentProps<typeof NumberField.Root>>) => (
    <NumberField.Root format={{ style: 'currency', currency: 'USD' }} locale="en-US" {...props}>
        <NumberField.Input aria-label="Price" />
    </NumberField.Root>
);

describe('NumberField format', () => {
    test('shows the formatted value with spinbutton semantics', () => {
        render(<Price defaultValue={1234.5} />);
        const input = screen.getByRole('spinbutton', { name: 'Price' });
        expect(input).toHaveValue('$1,234.50');
        expect(input).toHaveAttribute('aria-valuenow', '1234.5');
        expect(input).toHaveAttribute('aria-valuetext', '$1,234.50');
        expect(input).toHaveAttribute('inputmode', 'decimal');
    });

    test('accepts formatted typing and reformats on blur', async() => {
        const user = userEvent.setup();
        const onValueChange = jest.fn();
        render(<Price defaultValue={1} onValueChange={onValueChange} />);
        const input = screen.getByRole('spinbutton', { name: 'Price' });
        await user.clear(input);
        await user.type(input, '2,000');
        expect(input).toHaveValue('2,000');
        expect(onValueChange).toHaveBeenLastCalledWith(2000);
        fireEvent.blur(input);
        expect(input).toHaveValue('$2,000.00');
    });

    test('arrow keys step and show the new formatted value', async() => {
        const user = userEvent.setup();
        render(<Price defaultValue={10} step={5} />);
        const input = screen.getByRole('spinbutton', { name: 'Price' });
        input.focus();
        await user.keyboard('{ArrowUp}');
        expect(input).toHaveValue('$15.00');
    });

    test('percent values are fractions', async() => {
        const user = userEvent.setup();
        const onValueChange = jest.fn();
        render(
            <NumberField.Root format={{ style: 'percent' }} locale="en-US" defaultValue={0.25} onValueChange={onValueChange}>
                <NumberField.Input aria-label="Discount" />
            </NumberField.Root>
        );
        const input = screen.getByRole('spinbutton', { name: 'Discount' });
        expect(input).toHaveValue('25%');
        await user.clear(input);
        await user.type(input, '50');
        expect(onValueChange).toHaveBeenLastCalledWith(0.5);
    });

    test('forms submit the plain number', () => {
        const { container } = render(<form><Price name="price" defaultValue={1234.5} /></form>);
        const data = new FormData(container.querySelector('form') as HTMLFormElement);
        expect(data.get('price')).toBe('1234.5');
    });

    test('parses locale separators', () => {
        expect(parseFormattedNumber('1.234,5', 'de-DE', {})).toBe(1234.5);
        expect(parseFormattedNumber('-$1,000.25', 'en-US', { style: 'currency', currency: 'USD' })).toBe(-1000.25);
        expect(parseFormattedNumber('', 'en-US', {})).toBe('');
        expect(parseFormattedNumber('-', 'en-US', {})).toBeNull();
    });

    test('without format it stays a native number input', () => {
        render(
            <NumberField.Root defaultValue={3}>
                <NumberField.Input aria-label="Count" />
            </NumberField.Root>
        );
        expect(screen.getByRole('spinbutton', { name: 'Count' })).toHaveAttribute('type', 'number');
    });
});
