import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import NavigationMenu from '../NavigationMenu';

describe('NavigationMenu component', () => {
    test('renders content when trigger is clicked', () => {
        const { getByText, queryByText } = render(
            <NavigationMenu.Root>
                <NavigationMenu.Item value="item1">
                    <NavigationMenu.Trigger>Open</NavigationMenu.Trigger>
                    <NavigationMenu.Content>
                        <NavigationMenu.Link href="#">Item 1 Content</NavigationMenu.Link>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>
            </NavigationMenu.Root>
        );

        expect(queryByText('Item 1 Content')).toBeNull();
        fireEvent.click(getByText('Open'));
        expect(getByText('Item 1 Content')).toBeInTheDocument();
    });

    test('closes content on second trigger click', () => {
        const { getByText, queryByText } = render(
            <NavigationMenu.Root>
                <NavigationMenu.Item value="item1">
                    <NavigationMenu.Trigger>Open</NavigationMenu.Trigger>
                    <NavigationMenu.Content>
                        <NavigationMenu.Link href="#">Item 1 Content</NavigationMenu.Link>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>
            </NavigationMenu.Root>
        );

        const trigger = getByText('Open');
        fireEvent.click(trigger);
        expect(getByText('Item 1 Content')).toBeInTheDocument();
        fireEvent.click(trigger);
        expect(queryByText('Item 1 Content')).toBeNull();
    });

    test('renders link with correct href', () => {
        const { getByText } = render(
            <NavigationMenu.Root>
                <NavigationMenu.Item value="item1">
                    <NavigationMenu.Link href="/about">About</NavigationMenu.Link>
                </NavigationMenu.Item>
            </NavigationMenu.Root>
        );

        const link = getByText('About');
        expect(link).toHaveAttribute('href', '/about');
    });
});

