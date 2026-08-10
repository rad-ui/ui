import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DropdownMenu from '../DropdownMenu';

describe('DropdownMenu lazy mount', () => {
    test('does not mount menu content until opened', () => {
        render(
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                    <DropdownMenu.Content data-testid="dropdown-content">
                        <DropdownMenu.Item label="Profile">Profile</DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        );

        expect(screen.queryByTestId('dropdown-content')).not.toBeInTheDocument();
    });

    test('mounts content after trigger opens the menu', async() => {
        const user = userEvent.setup();

        render(
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                    <DropdownMenu.Content>
                        <DropdownMenu.Item label="Profile">Profile</DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        );

        await user.click(screen.getByText('Open'));
        expect(screen.getByText('Profile')).toBeInTheDocument();
    });
});
