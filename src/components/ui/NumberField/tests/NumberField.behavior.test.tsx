import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import NumberField from '../NumberField';

const renderField = (rootProps: Partial<React.ComponentProps<typeof NumberField.Root>> = {}, inputProps: Partial<React.ComponentProps<typeof NumberField.Input>> = {}) => render(
    <NumberField.Root {...rootProps}>
        <NumberField.Decrement>-</NumberField.Decrement>
        <NumberField.Input aria-label="Amount" {...inputProps} />
        <NumberField.Increment>+</NumberField.Increment>
    </NumberField.Root>
);

const input = () => screen.getByRole('spinbutton') as HTMLInputElement;
const key = (k: string, init: Partial<KeyboardEventInit> = {}) => fireEvent.keyDown(input(), { key: k, ...init });

describe('NumberField behavior', () => {
    test('step defaults to 1 and largeStep defaults to step * 10', () => {
        renderField({ defaultValue: 5 });
        key('ArrowUp');
        expect(input()).toHaveValue(6);
        key('ArrowDown');
        key('ArrowDown');
        expect(input()).toHaveValue(4);
        key('ArrowUp', { shiftKey: true });
        expect(input()).toHaveValue(14);
        key('PageDown');
        expect(input()).toHaveValue(4);
        key('PageUp');
        expect(input()).toHaveValue(14);
    });

    test('Home and End jump to min and max', () => {
        renderField({ defaultValue: 5, min: -3, max: 42 });
        key('End');
        expect(input()).toHaveValue(42);
        key('Home');
        expect(input()).toHaveValue(-3);
    });

    test('decimal steps do not accumulate floating point error', () => {
        renderField({ defaultValue: 0, step: 0.1 });
        for (let i = 0; i < 3; i++) key('ArrowUp');
        expect(input().value).toBe('0.3');
        key('ArrowDown');
        expect(input().value).toBe('0.2');
    });

    test('stepping from an empty field starts from zero, clamped to range', () => {
        const { unmount } = renderField({});
        fireEvent.click(screen.getByRole('button', { name: '+' }));
        expect(input()).toHaveValue(1);
        unmount();

        renderField({ min: 5, max: 10 });
        key('ArrowUp');
        expect(input()).toHaveValue(5);
    });

    test('typing is not clamped per keystroke; value is clamped on blur and Enter', () => {
        const onValueChange = jest.fn();
        renderField({ min: 10, max: 100, onValueChange });
        fireEvent.change(input(), { target: { value: '5' } });
        expect(input()).toHaveValue(5);
        fireEvent.change(input(), { target: { value: '50' } });
        expect(input()).toHaveValue(50);
        fireEvent.change(input(), { target: { value: '500' } });
        fireEvent.blur(input());
        expect(input()).toHaveValue(100);
        expect(onValueChange).toHaveBeenLastCalledWith(100);

        fireEvent.change(input(), { target: { value: '2' } });
        key('Enter');
        expect(input()).toHaveValue(10);
    });

    test('clears to empty and submits via FormData with native constraints', () => {
        render(
            <form data-testid="form">
                <NumberField.Root name="qty" defaultValue={3} min={0} max={9} step={0.5} required>
                    <NumberField.Input aria-label="Amount" />
                </NumberField.Root>
            </form>
        );
        expect(input()).toHaveAttribute('min', '0');
        expect(input()).toHaveAttribute('max', '9');
        expect(input()).toHaveAttribute('step', '0.5');
        expect(input()).toBeRequired();
        expect(new FormData(screen.getByTestId('form') as HTMLFormElement).get('qty')).toBe('3');
        fireEvent.change(input(), { target: { value: '' } });
        expect(input().value).toBe('');
        expect(new FormData(screen.getByTestId('form') as HTMLFormElement).get('qty')).toBe('');
    });

    test('readOnly and disabled block keyboard and button stepping', () => {
        const onValueChange = jest.fn();
        const { unmount } = renderField({ defaultValue: 1, readOnly: true, onValueChange });
        key('ArrowUp');
        key('PageUp');
        expect(input()).toHaveValue(1);
        expect(screen.getByRole('button', { name: '+' })).toBeDisabled();
        unmount();

        renderField({ defaultValue: 1, disabled: true, onValueChange });
        expect(input()).toBeDisabled();
        expect(screen.getByRole('button', { name: '-' })).toBeDisabled();
        expect(onValueChange).not.toHaveBeenCalled();
    });

    test('buttons disable at the bounds', () => {
        renderField({ defaultValue: 9, min: 0, max: 10 });
        const inc = screen.getByRole('button', { name: '+' });
        expect(inc).not.toBeDisabled();
        fireEvent.click(inc);
        expect(input()).toHaveValue(10);
        expect(inc).toBeDisabled();
        expect(inc).toHaveAttribute('data-disabled');
    });

    test('user handlers are composed instead of replacing internal behavior', () => {
        const onClick = jest.fn();
        const onKeyDown = jest.fn();
        const onChange = jest.fn();
        render(
            <NumberField.Root defaultValue={1}>
                <NumberField.Input aria-label="Amount" onKeyDown={onKeyDown} onChange={onChange} />
                <NumberField.Increment onClick={onClick}>+</NumberField.Increment>
            </NumberField.Root>
        );
        fireEvent.click(screen.getByRole('button', { name: '+' }));
        expect(onClick).toHaveBeenCalled();
        expect(input()).toHaveValue(2);
        key('ArrowUp');
        expect(onKeyDown).toHaveBeenCalled();
        expect(input()).toHaveValue(3);
        fireEvent.change(input(), { target: { value: '7' } });
        expect(onChange).toHaveBeenCalled();
        expect(input()).toHaveValue(7);
    });

    test('holding a stepper button repeats until released, without a double step on click', () => {
        jest.useFakeTimers();
        try {
            renderField({ defaultValue: 0, max: 100 });
            const inc = screen.getByRole('button', { name: '+' });
            fireEvent.pointerDown(inc, { button: 0 });
            expect(input()).toHaveValue(1);
            act(() => { jest.advanceTimersByTime(400 + 60 * 3); });
            expect(input()).toHaveValue(4);
            fireEvent.pointerUp(window);
            fireEvent.click(inc, { detail: 1 });
            act(() => { jest.advanceTimersByTime(1000); });
            expect(input()).toHaveValue(4);
        } finally {
            jest.useRealTimers();
        }
    });

    test('holding stops at max', () => {
        jest.useFakeTimers();
        try {
            renderField({ defaultValue: 8, max: 10 });
            fireEvent.pointerDown(screen.getByRole('button', { name: '+' }), { button: 0 });
            act(() => { jest.advanceTimersByTime(2000); });
            expect(input()).toHaveValue(10);
        } finally {
            jest.useRealTimers();
        }
    });

    test('controlled value works with stepping and typing', () => {
        const Controlled = () => {
            const [value, setValue] = React.useState<number | ''>(2);
            return (
                <NumberField.Root value={value} onValueChange={setValue} step={0.25}>
                    <NumberField.Input aria-label="Amount" />
                    <NumberField.Increment>+</NumberField.Increment>
                    <output data-testid="out">{String(value)}</output>
                </NumberField.Root>
            );
        };
        render(<Controlled />);
        fireEvent.click(screen.getByRole('button', { name: '+' }));
        expect(screen.getByTestId('out')).toHaveTextContent('2.25');
        fireEvent.change(input(), { target: { value: '' } });
        expect(screen.getByTestId('out')).toHaveTextContent('');
    });
});
