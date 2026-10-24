import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberField from '../NumberField';

const Field = (props: Partial<React.ComponentProps<typeof NumberField.Root>>) => (
    <NumberField.Root defaultValue={5} min={0} max={10} {...props}>
        <NumberField.Input aria-label="Qty" />
        <NumberField.Increment aria-label="More" />
        <NumberField.Decrement aria-label="Less" />
    </NumberField.Root>
);

describe('NumberField onValueCommit', () => {
    test('typing commits on blur, not per keystroke, and clamps first', async() => {
        const user = userEvent.setup();
        const onValueChange = jest.fn();
        const onValueCommit = jest.fn();
        render(<Field onValueChange={onValueChange} onValueCommit={onValueCommit} />);
        const input = screen.getByRole('spinbutton', { name: 'Qty' });
        await user.clear(input);
        await user.type(input, '42');
        expect(onValueChange).toHaveBeenCalled();
        expect(onValueCommit).not.toHaveBeenCalled();
        await user.tab();
        expect(onValueCommit).toHaveBeenCalledTimes(1);
        expect(onValueCommit).toHaveBeenLastCalledWith(10);
    });

    test('keyboard steps commit right away', () => {
        const onValueCommit = jest.fn();
        render(<Field onValueCommit={onValueCommit} />);
        const input = screen.getByRole('spinbutton', { name: 'Qty' });
        fireEvent.keyDown(input, { key: 'ArrowUp' });
        expect(onValueCommit).toHaveBeenLastCalledWith(6);
        fireEvent.keyDown(input, { key: 'End' });
        expect(onValueCommit).toHaveBeenLastCalledWith(10);
    });

    test('a held stepper commits once, on release', () => {
        jest.useFakeTimers();
        const onValueCommit = jest.fn();
        render(<Field onValueCommit={onValueCommit} />);
        const more = screen.getByRole('button', { name: 'More' });
        fireEvent.pointerDown(more, { button: 0 });
        act(() => { jest.advanceTimersByTime(400 + 60 * 2); });
        expect(onValueCommit).not.toHaveBeenCalled();
        fireEvent.pointerUp(window);
        expect(onValueCommit).toHaveBeenCalledTimes(1);
        expect(onValueCommit).toHaveBeenLastCalledWith(8);
        jest.useRealTimers();
    });

    test('keyboard activation of a stepper commits; no change means no commit', async() => {
        const user = userEvent.setup();
        const onValueCommit = jest.fn();
        render(<Field defaultValue={10} onValueCommit={onValueCommit} />);
        screen.getByRole('button', { name: 'Less' }).focus();
        await user.keyboard('{Enter}');
        expect(onValueCommit).toHaveBeenLastCalledWith(9);
        screen.getByRole('spinbutton', { name: 'Qty' }).focus();
        await user.tab();
        expect(onValueCommit).toHaveBeenCalledTimes(1);
    });
});
