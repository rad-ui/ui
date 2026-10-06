import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Drawer from '../Drawer';

// The shipped themes hide the closed popup with `visibility: hidden` and the
// popup mounts in that state before flipping to open for the entrance
// transition. Reproduce that here so focus management is tested against it.
const hideClosedPopup = () => {
    const style = document.createElement('style');
    style.textContent = '[data-state="closed"] { visibility: hidden; }';
    document.head.appendChild(style);
    return () => style.remove();
};

describe('Drawer focus management', () => {
    let removeStyle: () => void;
    beforeEach(() => { removeStyle = hideClosedPopup(); });
    afterEach(() => removeStyle());

    test('moves focus into the drawer, traps Tab, and returns focus on close', async() => {
        const user = userEvent.setup();
        render(
            <>
                <button>Before</button>
                <Drawer.Root>
                    <Drawer.Trigger>Open drawer</Drawer.Trigger>
                    <Drawer.Portal>
                        <Drawer.Overlay />
                        <Drawer.Content>
                            <Drawer.Title>Drawer</Drawer.Title>
                            <button>First action</button>
                            <Drawer.Close>Close</Drawer.Close>
                        </Drawer.Content>
                    </Drawer.Portal>
                </Drawer.Root>
                <button>After</button>
            </>
        );

        const trigger = screen.getByText('Open drawer');
        await user.click(trigger);

        const first = await screen.findByText('First action');
        await waitFor(() => expect(first).toHaveFocus());

        await user.tab();
        expect(screen.getByText('Close')).toHaveFocus();
        await user.tab();
        await waitFor(() => expect(first).toHaveFocus());
        expect(screen.getByText('After')).not.toHaveFocus();

        await user.keyboard('{Escape}');
        await waitFor(() => expect(trigger).toHaveFocus());
    });

    // The real themes keep the popup hidden for a moment *after* data-state
    // flips to "open" (the visibility transition). If the focus manager engages
    // then, nothing is focusable: in browsers initial focus silently fails and
    // Tab walks the page behind the modal. Focus must wait until it is visible.
    test('waits until the popup is visible before moving focus in', async() => {
        const user = userEvent.setup();
        const lag = document.createElement('style');
        lag.textContent = '[role="dialog"] { visibility: hidden; }';
        document.head.appendChild(lag);

        render(
            <Drawer.Root>
                <Drawer.Trigger>Open drawer</Drawer.Trigger>
                <Drawer.Portal>
                    <Drawer.Content>
                        <Drawer.Title>Drawer</Drawer.Title>
                        <button>First action</button>
                        <Drawer.Close>Close</Drawer.Close>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        );

        await user.click(screen.getByText('Open drawer'));
        await waitFor(() => expect(screen.getByRole('dialog', { hidden: true })).toHaveAttribute('data-state', 'open'));
        // Become visible a few frames after opening, like a theme transition.
        await new Promise((resolve) => setTimeout(resolve, 50));
        lag.remove();

        await waitFor(() => expect(screen.getByText('First action')).toHaveFocus());
    });
});
