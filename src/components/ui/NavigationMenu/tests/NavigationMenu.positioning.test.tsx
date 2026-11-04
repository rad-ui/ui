import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import NavigationMenu from '../NavigationMenu';

const rect = (x: number, y: number, width: number, height: number) => ({
    x, y, left: x, top: y, width, height, right: x + width, bottom: y + height, toJSON: () => ({})
}) as DOMRect;

const Menu = (props: React.ComponentProps<typeof NavigationMenu.Viewport>) => (
    <NavigationMenu.Root>
        <NavigationMenu.Item value="products">
            <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
            <NavigationMenu.Content><NavigationMenu.Link href="#a">Analytics</NavigationMenu.Link></NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Viewport data-testid="viewport" {...props} />
    </NavigationMenu.Root>
);

const settle = () => act(async() => { await new Promise((resolve) => setTimeout(resolve, 0)); });

describe('NavigationMenu.Viewport positioning', () => {
    test('without positioning props it is left to CSS', async() => {
        render(<Menu />);
        fireEvent.click(screen.getByText('Products'));
        await settle();
        const viewport = screen.getByTestId('viewport');
        expect(viewport.style.position).toBe('');
        expect(viewport).not.toHaveAttribute('data-side');
    });

    test('side, align and offsets place it against the open trigger', async() => {
        render(<Menu side="bottom" align="start" sideOffset={8} alignOffset={4} collisionAvoidance={{ side: 'none', align: 'none' }} />);
        const trigger = screen.getByText('Products').closest('button')!;
        trigger.getBoundingClientRect = () => rect(100, 20, 80, 20);
        fireEvent.click(trigger);
        await settle();
        const viewport = screen.getByTestId('viewport');
        expect(viewport.style.position).toBe('absolute');
        expect(viewport).toHaveAttribute('data-side', 'bottom');
        expect(viewport).toHaveAttribute('data-align', 'start');
        // floating-ui writes the coordinates into the transform (or top/left).
        const placed = `${viewport.style.transform} ${viewport.style.left} ${viewport.style.top}`;
        expect(placed).toMatch(/104px/);
        expect(placed).toMatch(/48px/);
    });

    test('anchor overrides the trigger', async() => {
        const anchor = { getBoundingClientRect: () => rect(300, 200, 10, 10) };
        render(<Menu anchor={anchor} side="right" collisionAvoidance={{ side: 'none', align: 'none' }} />);
        fireEvent.click(screen.getByText('Products'));
        await settle();
        const viewport = screen.getByTestId('viewport');
        expect(viewport).toHaveAttribute('data-side', 'right');
        expect(`${viewport.style.transform} ${viewport.style.left}`).toMatch(/310px/);
    });
});
