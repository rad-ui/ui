import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DropdownMenu from '../DropdownMenu';

describe('DropdownMenu controlled switch', () => {
    const menu = (rootProps: Partial<React.ComponentProps<typeof DropdownMenu.Root>>) => (
        <DropdownMenu.Root {...rootProps}>
            <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content>
                    <DropdownMenu.Item label="Profile">Profile</DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );

    test('switches from uncontrolled defaultOpen to controlled open', async() => {
        const user = userEvent.setup();
        const onOpenChange = jest.fn();

        const { rerender } = render(menu({ defaultOpen: true }));

        expect(screen.getByText('Profile')).toBeInTheDocument();

        rerender(menu({ open: false, onOpenChange }));

        expect(screen.queryByText('Profile')).not.toBeInTheDocument();

        await user.click(screen.getByText('Open'));
        expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    test('switches from controlled open to uncontrolled defaultOpen', () => {
        const { rerender } = render(menu({ defaultOpen: true }));

        expect(screen.getByText('Profile')).toBeInTheDocument();

        rerender(menu({ open: false }));
        expect(screen.queryByText('Profile')).not.toBeInTheDocument();

        rerender(menu({ defaultOpen: true }));
        expect(screen.getByText('Profile')).toBeInTheDocument();
    });
});
