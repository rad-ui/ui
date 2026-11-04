import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import NumberField from '../NumberField';

const Field = (props: Partial<React.ComponentProps<typeof NumberField.Root>>) => (
    <NumberField.Root defaultValue={5} {...props}>
        <NumberField.Input aria-label="Amount" />
    </NumberField.Root>
);

describe('NumberField smallStep', () => {
    test('Alt+Arrow moves by step / 10 by default', () => {
        render(<Field />);
        const input = screen.getByRole('spinbutton', { name: 'Amount' }) as HTMLInputElement;
        fireEvent.keyDown(input, { key: 'ArrowUp', altKey: true });
        expect(input.value).toBe('5.1');
        fireEvent.keyDown(input, { key: 'ArrowDown', altKey: true });
        fireEvent.keyDown(input, { key: 'ArrowDown', altKey: true });
        expect(input.value).toBe('4.9');
    });

    test('uses the smallStep prop and rounds away float noise', () => {
        const onValueChange = jest.fn();
        render(<Field defaultValue={0.1} step={1} smallStep={0.2} onValueChange={onValueChange} />);
        const input = screen.getByRole('spinbutton', { name: 'Amount' });
        fireEvent.keyDown(input, { key: 'ArrowUp', altKey: true });
        expect(onValueChange).toHaveBeenLastCalledWith(0.3);
    });

    test('Shift still wins over Alt, and plain arrows use step', () => {
        const onValueChange = jest.fn();
        render(<Field onValueChange={onValueChange} />);
        const input = screen.getByRole('spinbutton', { name: 'Amount' });
        fireEvent.keyDown(input, { key: 'ArrowUp', altKey: true, shiftKey: true });
        expect(onValueChange).toHaveBeenLastCalledWith(15);
        fireEvent.keyDown(input, { key: 'ArrowUp' });
        expect(onValueChange).toHaveBeenLastCalledWith(16);
    });
});
