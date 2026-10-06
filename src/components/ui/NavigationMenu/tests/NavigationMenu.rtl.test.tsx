import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

    test('opens panel content in rtl layout', async() => {
        const user = userEvent.setup({ skipHover: true });

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

        await user.click(trigger);
        expect(screen.getByText('Item 1 Content')).toBeInTheDocument();
    });

    // Three items, so a wrong direction (which wraps to the last item) can't pass by accident.
    test('arrow keys between top-level items follow reading direction with dir="rtl"', async() => {
        const user = userEvent.setup();
        render(
            <NavigationMenu.Root dir="rtl" aria-label="Main">
                <NavigationMenu.Item value="products">
                    <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
                    <NavigationMenu.Content><NavigationMenu.Link href="#a">Analytics</NavigationMenu.Link></NavigationMenu.Content>
                </NavigationMenu.Item>
                <NavigationMenu.Item value="pricing">
                    <NavigationMenu.Trigger>Pricing</NavigationMenu.Trigger>
                    <NavigationMenu.Content><NavigationMenu.Link href="#b">Plans</NavigationMenu.Link></NavigationMenu.Content>
                </NavigationMenu.Item>
                <NavigationMenu.Item value="docs">
                    <NavigationMenu.Trigger>Docs</NavigationMenu.Trigger>
                    <NavigationMenu.Content><NavigationMenu.Link href="#c">Guides</NavigationMenu.Link></NavigationMenu.Content>
                </NavigationMenu.Item>
            </NavigationMenu.Root>
        );
        expect(screen.getByRole('navigation')).toHaveAttribute('dir', 'rtl');
        screen.getByText('Products').focus();
        await user.keyboard('{ArrowLeft}');
        expect(screen.getByText('Pricing')).toHaveFocus();
        await user.keyboard('{ArrowRight}');
        expect(screen.getByText('Products')).toHaveFocus();
    });
});
