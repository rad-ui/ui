import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DropdownMenu from '../DropdownMenu';

const Menu = ({ onOpenChange }: { onOpenChange?: (open: boolean) => void }) => (
    <DropdownMenu.Root onOpenChange={onOpenChange}>
        <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>
        <DropdownMenu.Portal>
            <DropdownMenu.Content>
                <DropdownMenu.Item label="Zoom in" closeOnClick={false}>Zoom in</DropdownMenu.Item>
                <DropdownMenu.Item label="Close">Close</DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Portal>
    </DropdownMenu.Root>
);

describe('DropdownMenu.Item closeOnClick', () => {
    test('closeOnClick={false} keeps the menu open after choosing the item', async() => {
        const user = userEvent.setup();
        render(<Menu />);
        await user.click(screen.getByText('Open'));
        await user.click(await screen.findByRole('menuitem', { name: 'Zoom in' }));
        await user.click(screen.getByRole('menuitem', { name: 'Zoom in' }));
        expect(screen.getByRole('menuitem', { name: 'Zoom in' })).toBeInTheDocument();
    });

    test('keyboard Enter respects it too', async() => {
        const user = userEvent.setup();
        render(<Menu />);
        await user.click(screen.getByText('Open'));
        const item = await screen.findByRole('menuitem', { name: 'Zoom in' });
        item.focus();
        await user.keyboard('{Enter}');
        expect(screen.getByRole('menuitem', { name: 'Zoom in' })).toBeInTheDocument();
    });

    test('items close the menu by default', async() => {
        const user = userEvent.setup();
        render(<Menu />);
        await user.click(screen.getByText('Open'));
        await user.click(await screen.findByRole('menuitem', { name: 'Close' }));
        await waitFor(() => expect(screen.queryByRole('menuitem', { name: 'Close' })).not.toBeInTheDocument());
    });
});
