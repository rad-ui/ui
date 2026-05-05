import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

    test('generates NavigationMenu classes from customRootClass', () => {
        const { getByText } = render(
            <NavigationMenu.Root customRootClass="rad-ui" defaultValue="item1">
                <NavigationMenu.Item value="item1">
                    <NavigationMenu.Trigger>Open</NavigationMenu.Trigger>
                    <NavigationMenu.Content>
                        <NavigationMenu.Link href="#">Item 1 Content</NavigationMenu.Link>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>
            </NavigationMenu.Root>
        );

        expect(getByText('Open')).toHaveClass('rad-ui-navigation-menu-trigger');
        expect(getByText('Item 1 Content')).toHaveClass('rad-ui-navigation-menu-link');
        expect(getByText('Item 1 Content').closest('.rad-ui-navigation-menu-content')).toBeInTheDocument();
        expect(getByText('Open').closest('.rad-ui-navigation-menu-root')).toBeInTheDocument();
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

    test('sets trigger state attributes when opened', () => {
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

        const trigger = getByText('Open');
        expect(trigger).toHaveAttribute('data-state', 'closed');
        expect(trigger).toHaveAttribute('aria-expanded', 'false');

        fireEvent.click(trigger);

        expect(trigger).toHaveAttribute('data-state', 'open');
        expect(trigger).toHaveAttribute('aria-expanded', 'true');
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

    test('loop={false} stops focus wrap between top-level triggers', async() => {
        const user = userEvent.setup();

        const { getByText } = render(
            <NavigationMenu.Root loop={false}>
                <NavigationMenu.Item value="item1">
                    <NavigationMenu.Trigger>Menu 1</NavigationMenu.Trigger>
                </NavigationMenu.Item>
                <NavigationMenu.Item value="item2">
                    <NavigationMenu.Trigger>Menu 2</NavigationMenu.Trigger>
                </NavigationMenu.Item>
            </NavigationMenu.Root>
        );

        const trigger1 = getByText('Menu 1');
        const trigger2 = getByText('Menu 2');

        await user.tab();
        expect(trigger1).toHaveFocus();

        await user.keyboard('{ArrowLeft}');
        expect(trigger1).toHaveFocus();

        await user.keyboard('{ArrowRight}');
        expect(trigger2).toHaveFocus();

        await user.keyboard('{ArrowRight}');
        expect(trigger2).toHaveFocus();
    });

    test('content loop={false} stops focus wrap between links', async() => {
        const user = userEvent.setup();

        const { getByText } = render(
            <NavigationMenu.Root defaultValue="item1">
                <NavigationMenu.Item value="item1">
                    <NavigationMenu.Trigger>Open</NavigationMenu.Trigger>
                    <NavigationMenu.Content loop={false}>
                        <NavigationMenu.Link href="#link-1">Link 1</NavigationMenu.Link>
                        <NavigationMenu.Link href="#link-2">Link 2</NavigationMenu.Link>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>
            </NavigationMenu.Root>
        );

        const trigger = getByText('Open');
        const link1 = getByText('Link 1');
        const link2 = getByText('Link 2');

        await user.tab();
        expect(trigger).toHaveFocus();

        await user.tab();
        expect(link1).toHaveFocus();

        await user.keyboard('{ArrowLeft}');
        expect(link1).toHaveFocus();

        await user.keyboard('{ArrowRight}');
        expect(link2).toHaveFocus();

        await user.keyboard('{ArrowRight}');
        expect(link2).toHaveFocus();
    });
});
