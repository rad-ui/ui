import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import NavigationMenu from '../NavigationMenu';
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

describe('NavigationMenu RTL', () => {
    beforeEach(() => mockMatchMedia());

    test('opens panel content in rtl layout', () => {
        render(
            <div dir="rtl">
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
            </div>
        );

        const trigger = screen.getByText('Open');
        expect(trigger.closest('[dir="rtl"]')).not.toBeNull();

        fireEvent.click(trigger);
        expect(screen.getByText('Item 1 Content')).toBeInTheDocument();
    });
});
