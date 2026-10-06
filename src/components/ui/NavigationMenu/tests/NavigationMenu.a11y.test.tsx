import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import NavigationMenu from '../NavigationMenu';

describe('NavigationMenu accessibility', () => {
    test('axe: no violations', async() => {
        const { container } = render(
            <NavigationMenu.Root>
                <NavigationMenu.Item value="item1">
                    <NavigationMenu.Trigger>Open</NavigationMenu.Trigger>
                    <NavigationMenu.Content>
                        <NavigationMenu.Link href="#">Item 1</NavigationMenu.Link>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>
            </NavigationMenu.Root>
        );
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });

    test('axe: no violations while content is open; role-less wrappers carry no aria-orientation', async() => {
        const { container, getByText } = render(
            <NavigationMenu.Root defaultValue="item1">
                <NavigationMenu.Item value="item1">
                    <NavigationMenu.Trigger>Open</NavigationMenu.Trigger>
                    <NavigationMenu.Content>
                        <NavigationMenu.Link href="#a">Item 1</NavigationMenu.Link>
                        <NavigationMenu.Link href="#b">Item 2</NavigationMenu.Link>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>
            </NavigationMenu.Root>
        );
        expect(getByText('Item 1')).toBeInTheDocument();
        container.querySelectorAll('[aria-orientation]').forEach((node) => {
            expect(node).toHaveAttribute('role');
        });
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });

    test('open trigger references its content panel with aria-controls', () => {
        const { getByText, container } = render(
            <NavigationMenu.Root>
                <NavigationMenu.Item value="item1">
                    <NavigationMenu.Trigger>Open</NavigationMenu.Trigger>
                    <NavigationMenu.Content>
                        <NavigationMenu.Link href="#a">Item 1</NavigationMenu.Link>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>
            </NavigationMenu.Root>
        );
        const trigger = getByText('Open');
        expect(trigger).not.toHaveAttribute('aria-controls');
        fireEvent.click(trigger);
        const content = container.querySelector('[data-state="open"]:not(button)') as HTMLElement;
        expect(content.id).toBeTruthy();
        expect(trigger).toHaveAttribute('aria-controls', content.id);
    });
});
