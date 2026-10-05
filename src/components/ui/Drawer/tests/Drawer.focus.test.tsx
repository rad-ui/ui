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
});
