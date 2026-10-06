import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Switch from '../Switch';

describe('Switch form participation and prop merging', () => {
    test('submits its value through FormData only while checked', async() => {
        const user = userEvent.setup();
        render(
            <form data-testid="form">
                <Switch.Root name="notify" value="yes"><Switch.Thumb /></Switch.Root>
            </form>
        );
        const form = screen.getByTestId('form') as HTMLFormElement;
        expect(new FormData(form).get('notify')).toBeNull();

        await user.click(screen.getByRole('switch'));
        expect(new FormData(form).getAll('notify')).toEqual(['yes']);
    });

    test('defaults the submitted value to "on" like a native checkbox', () => {
        render(
            <form data-testid="form">
                <Switch.Root name="notify" defaultChecked><Switch.Thumb /></Switch.Root>
            </form>
        );
        expect(new FormData(screen.getByTestId('form') as HTMLFormElement).get('notify')).toBe('on');
    });

    test('required blocks submission until switched on', async() => {
        const user = userEvent.setup();
        render(
            <form data-testid="form">
                <Switch.Root name="terms" required><Switch.Thumb /></Switch.Root>
            </form>
        );
        const form = screen.getByTestId('form') as HTMLFormElement;
        expect(form.checkValidity()).toBe(false);
        await user.click(screen.getByRole('switch'));
        expect(form.checkValidity()).toBe(true);
    });

    test('form reset restores defaultChecked', async() => {
        const user = userEvent.setup();
        render(
            <form data-testid="form">
                <Switch.Root name="notify"><Switch.Thumb /></Switch.Root>
            </form>
        );
        await user.click(screen.getByRole('switch'));
        expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
        act(() => {
            fireEvent.reset(screen.getByTestId('form'));
        });
        expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
    });

    test('consumer className is merged with the component class', () => {
        render(<Switch.Root className="mine" customRootClass="acme"><Switch.Thumb /></Switch.Root>);
        const root = screen.getByRole('switch');
        expect(root).toHaveClass('mine');
        expect(root).toHaveClass('acme-switch');
    });

    test('consumer onClick does not stop the switch from toggling', async() => {
        const user = userEvent.setup();
        const onClick = jest.fn();
        render(<Switch.Root onClick={onClick}><Switch.Thumb /></Switch.Root>);
        await user.click(screen.getByRole('switch'));
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
    });
});
