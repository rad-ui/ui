import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toaster, ToastState, toast } from '../Toast';

const setup = (hotkey?: string[]) => render(
    <>
        <button>Elsewhere</button>
        <Toaster closeButton hotkey={hotkey} />
    </>
);

describe('Toast keyboard', () => {
    afterEach(() => {
        ToastState.dismissAll();
    });

    test('Alt+T moves focus to the toasts, and Escape on the region hands it back', async() => {
        const user = userEvent.setup();
        setup();
        const elsewhere = screen.getByRole('button', { name: 'Elsewhere' });
        elsewhere.focus();

        const region = screen.getByRole('region', { name: 'Notifications' });
        expect(region).toHaveAttribute('aria-keyshortcuts', 'Alt+T');

        await user.keyboard('{Alt>}t{/Alt}');
        expect(region).toHaveFocus();

        await user.keyboard('{Escape}');
        expect(elsewhere).toHaveFocus();
    });

    test('an empty hotkey turns the shortcut off', async() => {
        const user = userEvent.setup();
        setup([]);
        const region = screen.getByRole('region', { name: 'Notifications' });
        expect(region).not.toHaveAttribute('aria-keyshortcuts');
        await user.keyboard('{Alt>}t{/Alt}');
        expect(region).not.toHaveFocus();
    });

    test('Escape dismisses the focused toast and keeps focus in the region', async() => {
        const user = userEvent.setup();
        setup();
        act(() => {
            toast('Saved', { timeout: 60_000 });
        });
        const close = await screen.findByRole('button', { name: 'Close notification' });
        close.focus();

        await user.keyboard('{Escape}');
        expect(screen.getByRole('region', { name: 'Notifications' })).toHaveFocus();
        await waitFor(() => expect(screen.queryByText('Saved')).not.toBeInTheDocument());
    });
});
