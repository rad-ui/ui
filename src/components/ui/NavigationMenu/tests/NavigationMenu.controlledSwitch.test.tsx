import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import NavigationMenu from '../NavigationMenu';

describe('NavigationMenu controlled switch', () => {
    const navigationMenu = (rootProps: Partial<React.ComponentProps<typeof NavigationMenu.Root>>) => (
        <NavigationMenu.Root {...rootProps}>
            <NavigationMenu.Item value="item1">
                <NavigationMenu.Trigger>Open</NavigationMenu.Trigger>
                <NavigationMenu.Content>
                    <NavigationMenu.Link href="#">Item 1 Content</NavigationMenu.Link>
                </NavigationMenu.Content>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="item2">
                <NavigationMenu.Trigger>Other</NavigationMenu.Trigger>
                <NavigationMenu.Content>
                    <NavigationMenu.Link href="#">Item 2 Content</NavigationMenu.Link>
                </NavigationMenu.Content>
            </NavigationMenu.Item>
        </NavigationMenu.Root>
    );

    test('switches from uncontrolled defaultValue to controlled value', () => {
        const onValueChange = jest.fn();

        const { rerender } = render(navigationMenu({ defaultValue: 'item1' }));

        expect(screen.getByText('Item 1 Content')).toBeInTheDocument();

        rerender(navigationMenu({ value: 'item2', onValueChange }));

        expect(screen.getByText('Item 2 Content')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Open'));
        expect(onValueChange).toHaveBeenCalledWith('item1');
    });

    test('switches from controlled value to uncontrolled defaultValue', () => {
        const { rerender } = render(navigationMenu({ defaultValue: 'item1' }));

        rerender(navigationMenu({ value: 'item2' }));
        expect(screen.getByText('Item 2 Content')).toBeInTheDocument();

        rerender(navigationMenu({ defaultValue: 'item1' }));
        expect(screen.getByText('Item 1 Content')).toBeInTheDocument();
    });
});
