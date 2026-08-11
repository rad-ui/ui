import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Theme from '~/components/ui/Theme/Theme';
import NavigationMenu from '../NavigationMenu';

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

describe('NavigationMenu lazy mount', () => {
    beforeEach(() => mockMatchMedia());

    test('does not mount panel content until opened', () => {
        render(
            <Theme>
                <NavigationMenu.Root>
                    <NavigationMenu.Item value="item1">
                        <NavigationMenu.Trigger>Open</NavigationMenu.Trigger>
                        <NavigationMenu.Content data-testid="nav-content">
                            <NavigationMenu.Link href="#">Item 1 Content</NavigationMenu.Link>
                        </NavigationMenu.Content>
                    </NavigationMenu.Item>
                </NavigationMenu.Root>
            </Theme>
        );

        expect(screen.queryByTestId('nav-content')).not.toBeInTheDocument();
        expect(screen.queryByText('Item 1 Content')).not.toBeInTheDocument();
    });

    test('mounts content after trigger opens the panel', async() => {
        const user = userEvent.setup({ skipHover: true });

        render(
            <Theme>
                <NavigationMenu.Root>
                    <NavigationMenu.Item value="item1">
                        <NavigationMenu.Trigger>Open</NavigationMenu.Trigger>
                        <NavigationMenu.Content>
                            <NavigationMenu.Link href="#">Item 1 Content</NavigationMenu.Link>
                        </NavigationMenu.Content>
                    </NavigationMenu.Item>
                </NavigationMenu.Root>
            </Theme>
        );

        await user.click(screen.getByText('Open'));
        await waitFor(() => expect(screen.getByText('Item 1 Content')).toBeInTheDocument());
    });
});
