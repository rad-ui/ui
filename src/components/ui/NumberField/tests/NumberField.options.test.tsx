import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NumberField from '../NumberField';

const Field = (props: Partial<React.ComponentProps<typeof NumberField.Root>>) => (
    <NumberField.Root {...props}>
        <NumberField.Decrement>-</NumberField.Decrement>
        <NumberField.Input aria-label="Qty" />
        <NumberField.Increment>+</NumberField.Increment>
    </NumberField.Root>
);

describe('NumberField options', () => {
    test('typed values are clamped on blur by default', () => {
        render(<Field min={0} max={10} />);
        const input = screen.getByLabelText('Qty');
        fireEvent.change(input, { target: { value: '50' } });
        fireEvent.blur(input);
        expect(input).toHaveValue(10);
    });

    test('allowOutOfRange keeps them, but the buttons still stop at the bounds', () => {
        render(<Field min={0} max={10} allowOutOfRange />);
        const input = screen.getByLabelText('Qty');
        fireEvent.change(input, { target: { value: '50' } });
        fireEvent.blur(input);
        expect(input).toHaveValue(50);
        expect(input).not.toHaveAttribute('max');
    });

    test('snapOnStep lands on the step grid first', () => {
        render(<Field defaultValue={3} step={5} snapOnStep />);
        const input = screen.getByLabelText('Qty');
        fireEvent.keyDown(input, { key: 'ArrowUp' });
        expect(input).toHaveValue(5);
        fireEvent.keyDown(input, { key: 'ArrowUp' });
        expect(input).toHaveValue(10);
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        expect(input).toHaveValue(0);
    });

    test('without snapOnStep it moves by the step from where it is', () => {
        render(<Field defaultValue={3} step={5} />);
        const input = screen.getByLabelText('Qty');
        fireEvent.keyDown(input, { key: 'ArrowUp' });
        expect(input).toHaveValue(8);
    });

    test('form and inputRef', () => {
        const ref = React.createRef<HTMLInputElement>();
        render(<><form id="outside" /><Field name="qty" form="outside" inputRef={ref} defaultValue={4} /></>);
        expect(ref.current).toBe(screen.getByLabelText('Qty'));
        expect(new FormData(document.getElementById('outside') as HTMLFormElement).get('qty')).toBe('4');
    });

    test('inputRef points at the hidden input with format', () => {
        const ref = React.createRef<HTMLInputElement>();
        render(<Field name="price" inputRef={ref} defaultValue={4} format={{ style: 'currency', currency: 'USD' }} />);
        expect(ref.current).toHaveAttribute('type', 'hidden');
        expect(ref.current).toHaveValue('4');
    });
});
