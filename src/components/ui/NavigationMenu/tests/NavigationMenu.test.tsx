import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
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

    test('sets data-state to open on content when triggered', () => {
        const { getByText } = render(
            <NavigationMenu.Root>
                <NavigationMenu.Item value="item1">
                    <NavigationMenu.Trigger>Open</NavigationMenu.Trigger>
                    <NavigationMenu.Content>
                        <NavigationMenu.Link href="#">Item 1 Content</NavigationMenu.Link>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>
            </NavigationMenu.Root>
        );

        fireEvent.click(getByText('Open'));
        const content = getByText('Item 1 Content').closest('[data-state]');
        expect(content).toHaveAttribute('data-state', 'open');
    });

    test('forwards ref to root', () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <NavigationMenu.Root ref={ref}>
                <NavigationMenu.Item value="item1">
                    <NavigationMenu.Trigger>Open</NavigationMenu.Trigger>
                </NavigationMenu.Item>
            </NavigationMenu.Root>
        );

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    test('forwards ref to item', () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <NavigationMenu.Root>
                <NavigationMenu.Item value="item1" ref={ref}>
                    <NavigationMenu.Trigger>Open</NavigationMenu.Trigger>
                </NavigationMenu.Item>
            </NavigationMenu.Root>
        );

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    test('forwards ref to trigger', () => {
        const ref = React.createRef<HTMLButtonElement>();
        render(
            <NavigationMenu.Root>
                <NavigationMenu.Item value="item1">
                    <NavigationMenu.Trigger ref={ref}>Open</NavigationMenu.Trigger>
                </NavigationMenu.Item>
            </NavigationMenu.Root>
        );

        expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    test('forwards ref to content', () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <NavigationMenu.Root defaultValue="item1">
                <NavigationMenu.Item value="item1">
                    <NavigationMenu.Content ref={ref}>
                        <NavigationMenu.Link href="#">Link</NavigationMenu.Link>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>
            </NavigationMenu.Root>
        );

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    test('forwards ref to link', async() => {
        const ref = React.createRef<HTMLAnchorElement>();
        render(
            <NavigationMenu.Root defaultValue="item1">
                <NavigationMenu.Item value="item1">
                    <NavigationMenu.Content>
                        <NavigationMenu.Link ref={ref} href="#">Link</NavigationMenu.Link>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>
            </NavigationMenu.Root>
        );

        await waitFor(() => {
            expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
        });
    });

    test('renders without console errors', () => {
        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

        render(
            <NavigationMenu.Root>
                <NavigationMenu.Item value="item1">
                    <NavigationMenu.Trigger>Open</NavigationMenu.Trigger>
                </NavigationMenu.Item>
            </NavigationMenu.Root>
        );

        expect(errorSpy).not.toHaveBeenCalled();
        expect(warnSpy).not.toHaveBeenCalled();

        errorSpy.mockRestore();
        warnSpy.mockRestore();
    });
});
