import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import NavigationMenu from '../NavigationMenu';

const Menu = React.forwardRef<HTMLElement, Omit<React.ComponentPropsWithoutRef<typeof NavigationMenu.Root>, 'children'>>((props, ref) => (
    <NavigationMenu.Root ref={ref} {...props}>
        <NavigationMenu.Item value="products">
            <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
            <NavigationMenu.Content>
                <NavigationMenu.Link href="/a">Alpha</NavigationMenu.Link>
                <NavigationMenu.Link href="/b">Beta</NavigationMenu.Link>
            </NavigationMenu.Content>
        </NavigationMenu.Item>
    </NavigationMenu.Root>
));
Menu.displayName = 'Menu';

describe('NavigationMenu landmark and ArrowDown', () => {
    test('root renders a labelled <nav> landmark and forwards its ref', () => {
        const ref = React.createRef<HTMLElement>();
        render(<Menu ref={ref} aria-label="Main" />);
        const nav = screen.getByRole('navigation', { name: 'Main' });
        expect(nav.tagName).toBe('NAV');
        expect(ref.current).toBe(nav);
    });

    test('a RefObject<HTMLDivElement> from earlier versions still type-checks and resolves', () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <NavigationMenu.Root ref={ref}>
                <NavigationMenu.Item value="x"><NavigationMenu.Trigger>X</NavigationMenu.Trigger></NavigationMenu.Item>
            </NavigationMenu.Root>
        );
        expect(ref.current?.tagName).toBe('NAV');
    });

    test('ArrowDown on a closed trigger opens the panel and focuses the first link', () => {
        render(<Menu />);
        const trigger = screen.getByText('Products');
        trigger.focus();
        fireEvent.keyDown(trigger, { key: 'ArrowDown' });
        expect(trigger).toHaveAttribute('aria-expanded', 'true');
        expect(screen.getByText('Alpha')).toHaveFocus();
    });

    test('ArrowDown on an open trigger moves focus to the first link', () => {
        render(<Menu />);
        const trigger = screen.getByText('Products');
        fireEvent.click(trigger);
        trigger.focus();
        fireEvent.keyDown(trigger, { key: 'ArrowDown' });
        expect(screen.getByText('Alpha')).toHaveFocus();
        expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    test('a consumer onKeyDown that calls preventDefault opts out', () => {
        render(
            <NavigationMenu.Root>
                <NavigationMenu.Item value="p">
                    <NavigationMenu.Trigger onKeyDown={(event) => event.preventDefault()}>Products</NavigationMenu.Trigger>
                    <NavigationMenu.Content>
                        <NavigationMenu.Link href="/a">Alpha</NavigationMenu.Link>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>
            </NavigationMenu.Root>
        );
        const trigger = screen.getByText('Products');
        fireEvent.keyDown(trigger, { key: 'ArrowDown' });
        expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });
});
