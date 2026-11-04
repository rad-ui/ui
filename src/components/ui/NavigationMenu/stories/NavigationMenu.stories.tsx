import React from 'react';
import NavigationMenu from '../NavigationMenu';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

export default {
    title: 'Components/NavigationMenu',
    component: NavigationMenu.Root
};

export const Default = () => (
    <SandboxEditor>
        <NavigationMenu.Root>
            <NavigationMenu.Item value="item1">
                <NavigationMenu.Trigger>Menu 1</NavigationMenu.Trigger>
                <NavigationMenu.Content>
                    <NavigationMenu.Link href="#">Content 1
                    </NavigationMenu.Link>
                </NavigationMenu.Content>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="item2">
                <NavigationMenu.Trigger>Menu 2</NavigationMenu.Trigger>
                <NavigationMenu.Content>
                    <NavigationMenu.Link href="#">Link 1</NavigationMenu.Link>
                    <NavigationMenu.Link href="#">Link 2</NavigationMenu.Link>
                    <NavigationMenu.Link href="#">Link 3</NavigationMenu.Link>
                </NavigationMenu.Content>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="item3">
                <NavigationMenu.Link href="#">Menu 3</NavigationMenu.Link>
            </NavigationMenu.Item>
        </NavigationMenu.Root>
    </SandboxEditor>
);

export const WithViewport = () => (
    <SandboxEditor>
        <NavigationMenu.Root>
            <NavigationMenu.Item value="products">
                <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
                <NavigationMenu.Content>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 12rem)' }}>
                        <NavigationMenu.Link href="#">Analytics</NavigationMenu.Link>
                        <NavigationMenu.Link href="#">Billing</NavigationMenu.Link>
                        <NavigationMenu.Link href="#">Customers</NavigationMenu.Link>
                        <NavigationMenu.Link href="#">Reports</NavigationMenu.Link>
                    </div>
                </NavigationMenu.Content>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="docs">
                <NavigationMenu.Trigger>Docs</NavigationMenu.Trigger>
                <NavigationMenu.Content>
                    <NavigationMenu.Link href="#">Guides</NavigationMenu.Link>
                    <NavigationMenu.Link href="#">API reference</NavigationMenu.Link>
                </NavigationMenu.Content>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="pricing">
                <NavigationMenu.Link href="#">Pricing</NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Viewport />
        </NavigationMenu.Root>
    </SandboxEditor>
);
