import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dialog from '../Dialog';
import DropdownMenu from '../../DropdownMenu/DropdownMenu';
import Theme from '~/components/ui/Theme/Theme';

const mockMatchMedia = () => {
    if ('matchMedia' in window && typeof window.matchMedia === 'function') return;
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(() => ({
            matches: false,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn()
        }))
    });
};

describe('RTL overlay components', () => {
    beforeEach(() => mockMatchMedia());

    test('Dialog opens in rtl', async() => {
        const user = userEvent.setup();

        render(
            <div dir="rtl">
                <Theme>
                    <Dialog.Root>
                        <Dialog.Trigger>Open</Dialog.Trigger>
                        <Dialog.Content>RTL dialog</Dialog.Content>
                    </Dialog.Root>
                </Theme>
            </div>
        );

        const trigger = screen.getByText('Open');
        expect(trigger.closest('[dir="rtl"]')).not.toBeNull();

        await user.click(trigger);
        expect(screen.getByText('RTL dialog')).toBeInTheDocument();
    });

    test('DropdownMenu opens in rtl', async() => {
        const user = userEvent.setup();

        render(
            <div dir="rtl">
                <Theme>
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
                        <DropdownMenu.Portal>
                            <DropdownMenu.Content>
                                <DropdownMenu.Item label="Profile">Profile</DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Portal>
                    </DropdownMenu.Root>
                </Theme>
            </div>
        );

        const trigger = screen.getByText('Menu');
        expect(trigger.closest('[dir="rtl"]')).not.toBeNull();

        await user.click(trigger);
        expect(screen.getByText('Profile')).toBeInTheDocument();
    });
});
