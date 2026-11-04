import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../Button';

describe('Button focusableWhenDisabled', () => {
    test('stays in the tab order and exposes aria-disabled', async() => {
        const user = userEvent.setup();
        render(
            <>
                <Button>Before</Button>
                <Button disabled focusableWhenDisabled>Save</Button>
            </>
        );
        const button = screen.getByRole('button', { name: 'Save' });
        expect(button).not.toBeDisabled();
        expect(button).toHaveAttribute('aria-disabled', 'true');
        expect(button).toHaveAttribute('data-disabled', '');

        await user.tab();
        await user.tab();
        expect(button).toHaveFocus();
    });

    test('does not activate on click, Enter or Space', async() => {
        const user = userEvent.setup();
        const onClick = jest.fn();
        render(<Button disabled focusableWhenDisabled onClick={onClick}>Save</Button>);
        const button = screen.getByRole('button', { name: 'Save' });

        await user.click(button);
        button.focus();
        await user.keyboard('{Enter}');
        await user.keyboard(' ');
        expect(onClick).not.toHaveBeenCalled();
    });

    test('does not submit its form', () => {
        const onSubmit = jest.fn((event: React.FormEvent) => event.preventDefault());
        render(
            <form onSubmit={onSubmit}>
                <Button type="submit" disabled focusableWhenDisabled>Send</Button>
            </form>
        );
        fireEvent.click(screen.getByRole('button', { name: 'Send' }));
        expect(onSubmit).not.toHaveBeenCalled();
    });

    test('keeps a disabled asChild span focusable', () => {
        render(
            <Button asChild disabled focusableWhenDisabled>
                <span>Span button</span>
            </Button>
        );
        const span = screen.getByRole('button', { name: 'Span button' });
        expect(span).toHaveAttribute('tabindex', '0');
        expect(span).toHaveAttribute('aria-disabled', 'true');
    });

    test('without the prop a disabled button stays natively disabled', () => {
        render(<Button disabled>Plain</Button>);
        expect(screen.getByRole('button', { name: 'Plain' })).toBeDisabled();
    });

    test('focus is kept when the button disables itself', () => {
        const Pending = () => {
            const [pending, setPending] = React.useState(false);
            return <Button disabled={pending} focusableWhenDisabled onClick={() => setPending(true)}>Pay</Button>;
        };
        render(<Pending />);
        const button = screen.getByRole('button', { name: 'Pay' });
        button.focus();
        fireEvent.click(button);
        expect(button).toHaveAttribute('aria-disabled', 'true');
        expect(button).toHaveFocus();
    });
});
