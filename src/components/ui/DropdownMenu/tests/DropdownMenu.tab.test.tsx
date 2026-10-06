import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DropdownMenu from '../DropdownMenu';

const Fixture = ({ portal }: { portal: boolean }) => {
    const content = (
        <DropdownMenu.Content>
            <DropdownMenu.Item label="Profile">Profile</DropdownMenu.Item>
            <DropdownMenu.Item label="Settings">Settings</DropdownMenu.Item>
        </DropdownMenu.Content>
    );
    return (
        <>
            <button>Before</button>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>Options</DropdownMenu.Trigger>
                {portal ? <DropdownMenu.Portal>{content}</DropdownMenu.Portal> : content}
            </DropdownMenu.Root>
            <button>After</button>
        </>
    );
};

describe.each([false, true])('DropdownMenu Tab handling (portal=%s)', (portal) => {
    test('Tab closes the menu and moves focus to the element after the trigger', async() => {
        const user = userEvent.setup();
        render(<Fixture portal={portal} />);
        screen.getByText('Options').focus();
        await user.keyboard('{Enter}');
        await waitFor(() => expect(screen.getByText('Profile')).toHaveFocus());

        await user.tab();
        await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
        await waitFor(() => expect(screen.getByText('After')).toHaveFocus());
    });

    test('Shift+Tab closes the menu and moves focus to the trigger', async() => {
        const user = userEvent.setup();
        render(<Fixture portal={portal} />);
        screen.getByText('Options').focus();
        await user.keyboard('{Enter}');
        await waitFor(() => expect(screen.getByText('Profile')).toHaveFocus());

        await user.tab({ shift: true });
        await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
        await waitFor(() => expect(screen.getByText('Options')).toHaveFocus());
    });
});

describe('DropdownMenu Tab handling from a submenu', () => {
    test('Tab inside an open submenu closes every level and moves past the root trigger', async() => {
        const user = userEvent.setup();
        render(
            <>
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>Options</DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                        <DropdownMenu.Item label="Profile">Profile</DropdownMenu.Item>
                        <DropdownMenu.Sub>
                            <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
                            <DropdownMenu.Content>
                                <DropdownMenu.Item label="Help">Help</DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Sub>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
                <button>After</button>
            </>
        );

        screen.getByText('Options').focus();
        await user.keyboard('{Enter}');
        await waitFor(() => expect(screen.getByText('Profile')).toHaveFocus());
        await user.keyboard('{ArrowDown}{ArrowRight}');
        await waitFor(() => expect(screen.getByText('Help')).toHaveFocus());

        await user.tab();
        await waitFor(() => expect(screen.queryAllByRole('menu')).toHaveLength(0));
        await waitFor(() => expect(screen.getByText('After')).toHaveFocus());
    });
});
