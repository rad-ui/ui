import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NavigationMenu from '../NavigationMenu';

const Menu = (props: Partial<React.ComponentProps<typeof NavigationMenu.Root>>) => (
    <div>
        <NavigationMenu.Root customRootClass="rad-ui" {...props}>
            <NavigationMenu.Item value="products">
                <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
                <NavigationMenu.Content>
                    <NavigationMenu.Link href="#a">Analytics</NavigationMenu.Link>
                    <NavigationMenu.Link href="#b">Billing</NavigationMenu.Link>
                </NavigationMenu.Content>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="docs">
                <NavigationMenu.Trigger>Docs</NavigationMenu.Trigger>
                <NavigationMenu.Content>
                    <NavigationMenu.Link href="#c">Guides</NavigationMenu.Link>
                </NavigationMenu.Content>
            </NavigationMenu.Item>
            <NavigationMenu.Viewport data-testid="viewport" />
        </NavigationMenu.Root>
        <button>Outside</button>
    </div>
);

describe('NavigationMenu.Viewport', () => {
    test('is hidden and closed while no panel is open', () => {
        render(<Menu />);
        const viewport = screen.getByTestId('viewport');
        expect(viewport).toHaveAttribute('hidden');
        expect(viewport).toHaveAttribute('data-state', 'closed');
        expect(viewport).toHaveClass('rad-ui-navigation-menu-viewport');
    });

    test('shows the open panel inside the viewport and swaps panels', () => {
        render(<Menu />);
        const viewport = screen.getByTestId('viewport');
        fireEvent.click(screen.getByText('Products'));
        expect(viewport).not.toHaveAttribute('hidden');
        expect(viewport).toHaveAttribute('data-state', 'open');
        expect(viewport).toContainElement(screen.getByText('Analytics'));

        fireEvent.click(screen.getByText('Docs'));
        expect(viewport).toContainElement(screen.getByText('Guides'));
        expect(screen.queryByText('Analytics')).toBeNull();
    });

    test('keyboard: ArrowDown moves focus into the portaled panel and Escape returns it', async() => {
        const user = userEvent.setup();
        render(<Menu />);
        const trigger = screen.getByText('Products');
        trigger.focus();
        await user.keyboard('{ArrowDown}');
        expect(screen.getByText('Analytics')).toHaveFocus();
        await user.keyboard('{Escape}');
        expect(screen.queryByText('Analytics')).toBeNull();
        expect(trigger).toHaveFocus();
    });

    test('pressing inside the portaled panel keeps it open; outside closes it', () => {
        render(<Menu />);
        fireEvent.click(screen.getByText('Products'));
        fireEvent.pointerDown(screen.getByText('Billing'));
        expect(screen.getByText('Billing')).toBeInTheDocument();
        fireEvent.pointerDown(screen.getByText('Outside'));
        expect(screen.queryByText('Billing')).toBeNull();
    });

    test('Tab order follows the triggers, not the DOM position of the viewport', async() => {
        const user = userEvent.setup();
        render(<Menu />);
        const products = screen.getByText('Products');
        fireEvent.click(products);
        products.focus();
        await user.tab();
        expect(screen.getByText('Analytics')).toHaveFocus();
        await user.tab({ shift: true });
        expect(products).toHaveFocus();
        await user.tab();
        await user.tab();
        expect(screen.getByText('Docs')).toHaveFocus();
    });

    test('sets size variables from the open panel', () => {
        const offsetWidth = jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(320);
        const offsetHeight = jest.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(180);
        render(<Menu defaultValue="products" />);
        const viewport = screen.getByTestId('viewport');
        expect(viewport.style.getPropertyValue('--rad-navigation-menu-viewport-width')).toBe('320px');
        expect(viewport.style.getPropertyValue('--rad-navigation-menu-viewport-height')).toBe('180px');
        expect(viewport.style.getPropertyValue('--radix-navigation-menu-viewport-width')).toBe('320px');
        offsetWidth.mockRestore();
        offsetHeight.mockRestore();
    });

    test('forwards refs and supports asChild', () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <NavigationMenu.Root>
                <NavigationMenu.Viewport ref={ref} asChild>
                    <section data-testid="custom" />
                </NavigationMenu.Viewport>
            </NavigationMenu.Root>
        );
        expect(ref.current).toBe(screen.getByTestId('custom'));
        expect(ref.current?.tagName).toBe('SECTION');
    });
});
