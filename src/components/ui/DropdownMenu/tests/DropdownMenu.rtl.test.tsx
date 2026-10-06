import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DropdownMenu from '../DropdownMenu';
import ContextMenu from '../../ContextMenu/ContextMenu';

const Menu = ({ dir }: { dir?: 'ltr' | 'rtl' }) => (
    <DropdownMenu.Root dir={dir}>
        <DropdownMenu.Trigger>Options</DropdownMenu.Trigger>
        <DropdownMenu.Content>
            <DropdownMenu.Item label="Profile">Profile</DropdownMenu.Item>
            <DropdownMenu.Sub>
                <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
                <DropdownMenu.Content data-testid="submenu">
                    <DropdownMenu.Item label="Help">Help</DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Sub>
        </DropdownMenu.Content>
    </DropdownMenu.Root>
);

const openToSubTrigger = async(user: ReturnType<typeof userEvent.setup>) => {
    screen.getByText('Options').focus();
    await user.keyboard('{Enter}');
    await waitFor(() => expect(screen.getByText('Profile')).toHaveFocus());
    await user.keyboard('{ArrowDown}');
    await waitFor(() => expect(screen.getByText('More')).toHaveFocus());
};

describe('DropdownMenu right-to-left', () => {
    test('ArrowLeft opens a submenu and ArrowRight closes it in RTL', async() => {
        const user = userEvent.setup();
        render(<Menu dir="rtl" />);
        await openToSubTrigger(user);

        await user.keyboard('{ArrowRight}');
        expect(screen.queryByText('Help')).not.toBeInTheDocument();

        await user.keyboard('{ArrowLeft}');
        await waitFor(() => expect(screen.getByText('Help')).toHaveFocus());

        await user.keyboard('{ArrowRight}');
        await waitFor(() => expect(screen.getByText('More')).toHaveFocus());
    });

    test('portaled menu content and submenus carry dir="rtl"', async() => {
        const user = userEvent.setup();
        render(<Menu dir="rtl" />);
        await openToSubTrigger(user);
        expect(screen.getByText('Profile').closest('[role="menu"]')).toHaveAttribute('dir', 'rtl');

        await user.keyboard('{ArrowLeft}');
        await waitFor(() => expect(screen.getByTestId('submenu')).toHaveAttribute('dir', 'rtl'));
    });

    test('LTR keeps ArrowRight for opening submenus and sets no dir', async() => {
        const user = userEvent.setup();
        render(<Menu />);
        await openToSubTrigger(user);
        expect(screen.getByText('Profile').closest('[role="menu"]')).not.toHaveAttribute('dir');
        await user.keyboard('{ArrowRight}');
        await waitFor(() => expect(screen.getByText('Help')).toHaveFocus());
    });
});

describe('ContextMenu right-to-left', () => {
    test('content carries dir="rtl"', async() => {
        render(
            <ContextMenu.Root dir="rtl">
                <ContextMenu.Trigger>Right-click here</ContextMenu.Trigger>
                <ContextMenu.Portal>
                    <ContextMenu.Content>
                        <ContextMenu.Item label="Copy">Copy</ContextMenu.Item>
                    </ContextMenu.Content>
                </ContextMenu.Portal>
            </ContextMenu.Root>
        );
        const user = userEvent.setup();
        await user.pointer({ keys: '[MouseRight]', target: screen.getByText('Right-click here') });
        await waitFor(() => expect(screen.getByText('Copy').closest('[role="menu"]')).toHaveAttribute('dir', 'rtl'));
    });
});
