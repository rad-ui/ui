import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Menubar from '../Menubar';

const renderWithSubmenu = () => render(
    <Menubar.Root aria-label="Application">
        <Menubar.Menu>
            <Menubar.Trigger>File</Menubar.Trigger>
            <Menubar.Content>
                <Menubar.Item>New</Menubar.Item>
                <Menubar.Sub>
                    <Menubar.SubTrigger>Share</Menubar.SubTrigger>
                    <Menubar.Content>
                        <Menubar.Item>Email</Menubar.Item>
                        <Menubar.Item>Messages</Menubar.Item>
                    </Menubar.Content>
                </Menubar.Sub>
            </Menubar.Content>
        </Menubar.Menu>
        <Menubar.Menu>
            <Menubar.Trigger>Edit</Menubar.Trigger>
            <Menubar.Content>
                <Menubar.Item>Cut</Menubar.Item>
            </Menubar.Content>
        </Menubar.Menu>
    </Menubar.Root>
);

describe('Menubar submenus', () => {
    test('ArrowRight on a sub trigger opens the submenu instead of moving to the next menu', async() => {
        const user = userEvent.setup();
        renderWithSubmenu();
        const file = screen.getByRole('menuitem', { name: 'File' });
        const edit = screen.getByRole('menuitem', { name: 'Edit' });

        file.focus();
        await user.keyboard('{Enter}');
        await waitFor(() => expect(screen.getByRole('menuitem', { name: 'New' })).toHaveFocus());
        await user.keyboard('{ArrowDown}');
        const share = screen.getByRole('menuitem', { name: 'Share' });
        await waitFor(() => expect(share).toHaveFocus());

        await user.keyboard('{ArrowRight}');
        await waitFor(() => expect(screen.getByRole('menuitem', { name: 'Email' })).toHaveFocus());
        expect(file).toHaveAttribute('aria-expanded', 'true');
        expect(edit).toHaveAttribute('aria-expanded', 'false');

        // ArrowLeft inside the submenu closes it and returns to the sub trigger.
        await user.keyboard('{ArrowLeft}');
        await waitFor(() => expect(screen.queryByRole('menuitem', { name: 'Email' })).not.toBeInTheDocument());
        await waitFor(() => expect(share).toHaveFocus());
        expect(file).toHaveAttribute('aria-expanded', 'true');

        // ArrowRight on a plain item still moves to the next menubar menu.
        await user.keyboard('{ArrowUp}');
        await waitFor(() => expect(screen.getByRole('menuitem', { name: 'New' })).toHaveFocus());
        await user.keyboard('{ArrowRight}');
        await waitFor(() => expect(edit).toHaveAttribute('aria-expanded', 'true'));
    });
});
