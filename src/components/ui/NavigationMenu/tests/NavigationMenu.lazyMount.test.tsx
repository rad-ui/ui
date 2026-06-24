import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NavigationMenu from '../NavigationMenu';

describe('NavigationMenu lazy mount', () => {
    test('does not mount panel content until opened', () => {
        render(
            <NavigationMenu.Root>
                <NavigationMenu.Item value="item1">
                    <NavigationMenu.Trigger>Open</NavigationMenu.Trigger>
                    <NavigationMenu.Content data-testid="nav-content">
                        <NavigationMenu.Link href="#">Item 1 Content</NavigationMenu.Link>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>
            </NavigationMenu.Root>
        );

        expect(screen.queryByTestId('nav-content')).not.toBeInTheDocument();
        expect(screen.queryByText('Item 1 Content')).not.toBeInTheDocument();
    });

    test('mounts content after trigger opens the panel', () => {
        render(
            <NavigationMenu.Root>
                <NavigationMenu.Item value="item1">
                    <NavigationMenu.Trigger>Open</NavigationMenu.Trigger>
                    <NavigationMenu.Content>
                        <NavigationMenu.Link href="#">Item 1 Content</NavigationMenu.Link>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>
            </NavigationMenu.Root>
        );

        fireEvent.click(screen.getByText('Open'));
        expect(screen.getByText('Item 1 Content')).toBeInTheDocument();
    });
});
