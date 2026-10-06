import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checkbox from '../Checkbox';

describe('Checkbox form mirror and labelling', () => {
    test('the id belongs only to the interactive control so labels target it', async() => {
        const user = userEvent.setup();
        render(
            <>
                <Checkbox.Root id="terms"><Checkbox.Indicator /></Checkbox.Root>
                <label htmlFor="terms">Accept terms</label>
            </>
        );
        const control = screen.getByRole('checkbox', { name: 'Accept terms' });
        expect(document.querySelectorAll('#terms')).toHaveLength(1);

        await user.click(screen.getByText('Accept terms'));
        expect(control).toHaveAttribute('aria-checked', 'true');
    });

    test('the hidden form input is not a second tab stop or accessible checkbox', async() => {
        const user = userEvent.setup();
        render(
            <>
                <Checkbox.Root aria-label="one" name="one"><Checkbox.Indicator /></Checkbox.Root>
                <button>after</button>
            </>
        );
        expect(screen.getAllByRole('checkbox')).toHaveLength(1);
        await user.tab();
        expect(screen.getByRole('checkbox', { name: 'one' })).toHaveFocus();
        await user.tab();
        expect(screen.getByRole('button', { name: 'after' })).toHaveFocus();
    });

    test('required blocks submission until checked', async() => {
        const user = userEvent.setup();
        render(
            <form data-testid="form">
                <Checkbox.Root aria-label="terms" name="terms" required><Checkbox.Indicator /></Checkbox.Root>
            </form>
        );
        const form = screen.getByTestId('form') as HTMLFormElement;
        expect(form.checkValidity()).toBe(false);
        await user.click(screen.getByRole('checkbox'));
        expect(form.checkValidity()).toBe(true);
        expect(new FormData(form).get('terms')).toBe('on');
    });

    test('form reset restores defaultChecked', async() => {
        const user = userEvent.setup();
        render(
            <form data-testid="form">
                <Checkbox.Root aria-label="news" name="news" defaultChecked><Checkbox.Indicator /></Checkbox.Root>
            </form>
        );
        await user.click(screen.getByRole('checkbox'));
        expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'false');
        act(() => {
            fireEvent.reset(screen.getByTestId('form'));
        });
        expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'true');
    });
});
