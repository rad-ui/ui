import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dialog from '../Dialog';
import DropdownMenu from '~/components/ui/DropdownMenu/DropdownMenu';
import Popover from '~/components/ui/Popover/Popover';

const Nested = ({ portal }: { portal: boolean }) => {
    const content = (
        <DropdownMenu.Content>
            <DropdownMenu.Item label="Rename">Rename</DropdownMenu.Item>
            <DropdownMenu.Item label="Duplicate">Duplicate</DropdownMenu.Item>
        </DropdownMenu.Content>
    );
    return (
        <Dialog.Root defaultOpen>
            <Dialog.Portal>
                <Dialog.Overlay />
                <Dialog.Content>
                    <Dialog.Title>Edit</Dialog.Title>
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>Actions</DropdownMenu.Trigger>
                        {portal ? <DropdownMenu.Portal>{content}</DropdownMenu.Portal> : content}
                    </DropdownMenu.Root>
                    <Dialog.Close>Close</Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

describe.each([false, true])('DropdownMenu inside Dialog (portal=%s)', (portal) => {
    test('selecting a menu item closes only the menu', async() => {
        const user = userEvent.setup();
        render(<Nested portal={portal} />);
        await screen.findByRole('dialog');
        await user.click(screen.getByText('Actions'));
        await user.click(await screen.findByText('Rename'));
        await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    test('Escape inside the menu closes only the menu', async() => {
        const user = userEvent.setup();
        render(<Nested portal={portal} />);
        await screen.findByRole('dialog');
        await user.click(screen.getByText('Actions'));
        await screen.findByRole('menu');
        await user.keyboard('{ArrowDown}');
        await user.keyboard('{Escape}');
        await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        await waitFor(() => expect(screen.getByText('Actions')).toHaveFocus());
        await user.keyboard('{Escape}');
        await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    });

    test('arrow keys move focus within the menu', async() => {
        const user = userEvent.setup();
        render(<Nested portal={portal} />);
        await screen.findByRole('dialog');
        screen.getByText('Actions').focus();
        await user.keyboard('{Enter}');
        await waitFor(() => expect(screen.getByText('Rename')).toHaveFocus());
        await user.keyboard('{ArrowDown}');
        expect(screen.getByText('Duplicate')).toHaveFocus();
    });
});

describe('Popover inside Dialog', () => {
    test('Escape and inside clicks in the popover do not close the dialog', async() => {
        const user = userEvent.setup();
        render(
            <Dialog.Root defaultOpen>
                <Dialog.Portal>
                    <Dialog.Content>
                        <Dialog.Title>Edit</Dialog.Title>
                        <Popover.Root>
                            <Popover.Trigger>Info</Popover.Trigger>
                            <Popover.Content>
                                <button>Inside popover</button>
                            </Popover.Content>
                        </Popover.Root>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        );
        await screen.findByRole('dialog', { name: 'Edit' });
        await user.click(screen.getByText('Info'));
        await user.click(await screen.findByText('Inside popover'));
        expect(screen.getByRole('dialog', { name: 'Edit' })).toBeInTheDocument();
        await user.keyboard('{Escape}');
        await waitFor(() => expect(screen.queryByText('Inside popover')).not.toBeInTheDocument());
        expect(screen.getByRole('dialog', { name: 'Edit' })).toBeInTheDocument();
    });
});
