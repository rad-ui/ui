import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Theme from '~/components/ui/Theme/Theme';
import DropdownMenu from '~/components/ui/DropdownMenu/DropdownMenu';

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

describe('Menu primitive portal', () => {
    beforeEach(() => mockMatchMedia());

    test('portals menu into Theme portal root', async() => {
        const user = userEvent.setup();

        render(
            <Theme>
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                        <DropdownMenu.Content>
                            <DropdownMenu.Item label="Profile">Profile</DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>
            </Theme>
        );

        const portalRoot = document.querySelector('[data-rad-ui-portal-root]') as HTMLElement;
        expect(portalRoot).toBeTruthy();

        await user.click(screen.getByText('Open'));
        await waitFor(() => {
            expect(portalRoot).toContainElement(screen.getByText('Profile'));
        });
    });
});
