import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
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

        // The root is a <nav> landmark.
        expect(ref.current).toBeInstanceOf(HTMLElement);
        expect(ref.current?.tagName).toBe('NAV');
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
    const renderMenu = () => render(
        <>
            <NavigationMenu.Root>
                <NavigationMenu.Item value="components">
                    <NavigationMenu.Trigger>Components</NavigationMenu.Trigger>
                    <NavigationMenu.Content>
                        <NavigationMenu.Link href="/docs/components/button">Button</NavigationMenu.Link>
                        <NavigationMenu.Link href="/docs/components/card">Card</NavigationMenu.Link>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>
            </NavigationMenu.Root>
            <button data-testid="outside">Outside</button>
        </>
    );

    test('Escape closes open content and returns focus to the trigger', async() => {
        const user = userEvent.setup();
        const { getByText, queryByText } = renderMenu();
        const trigger = getByText('Components');

        fireEvent.click(trigger);
        expect(getByText('Button')).toBeInTheDocument();

        getByText('Button').focus();
        await user.keyboard('{Escape}');

        expect(queryByText('Button')).toBeNull();
        expect(trigger).toHaveAttribute('aria-expanded', 'false');
        expect(trigger).toHaveFocus();
    });

    test('Escape closes content even when focus is not inside the menu', () => {
        const { getByText, queryByText } = renderMenu();
        const trigger = getByText('Components');

        fireEvent.click(trigger);
        expect(getByText('Button')).toBeInTheDocument();

        (document.activeElement as HTMLElement | null)?.blur();
        fireEvent.keyDown(document.body, { key: 'Escape' });

        expect(queryByText('Button')).toBeNull();
        expect(trigger).toHaveFocus();
    });

    test('pointerdown outside the item closes open content', () => {
        const { getByText, getByTestId, queryByText } = renderMenu();

        fireEvent.click(getByText('Components'));
        expect(getByText('Button')).toBeInTheDocument();

        // pointerdown inside the content keeps it open
        fireEvent.pointerDown(getByText('Card'));
        expect(getByText('Button')).toBeInTheDocument();

        fireEvent.pointerDown(getByTestId('outside'));
        expect(queryByText('Button')).toBeNull();
        expect(getByText('Components')).toHaveAttribute('data-state', 'closed');
    });

    test('hover-opened content survives the pointer crossing the gap into the panel', () => {
        jest.useFakeTimers();
        try {
            const { getByText, queryByText } = renderMenu();
            const item = getByText('Components').parentElement as HTMLElement;

            fireEvent.mouseEnter(item);
            expect(getByText('Button')).toBeInTheDocument();

            // Pointer leaves the trigger area and re-enters over the content before the close delay.
            fireEvent.mouseLeave(item);
            act(() => { jest.advanceTimersByTime(50); });
            fireEvent.mouseEnter(item);
            act(() => { jest.advanceTimersByTime(500); });

            expect(getByText('Button')).toBeInTheDocument();
            expect(getByText('Card')).toBeInTheDocument();
            expect(queryByText('Card')).toBeVisible();
        } finally {
            jest.useRealTimers();
        }
    });

    test('hover-opened content closes after the pointer has fully left', () => {
        jest.useFakeTimers();
        try {
            const { getByText, queryByText } = renderMenu();
            const item = getByText('Components').parentElement as HTMLElement;

            fireEvent.mouseEnter(item);
            fireEvent.mouseLeave(item);
            expect(getByText('Button')).toBeInTheDocument();

            act(() => { jest.advanceTimersByTime(500); });
            expect(queryByText('Button')).toBeNull();
        } finally {
            jest.useRealTimers();
        }
    });

    test('mouse leave after Escape does not re-open content', () => {
        const { getByText, queryByText } = renderMenu();
        const trigger = getByText('Components');
        const item = trigger.parentElement as HTMLElement;

        fireEvent.mouseEnter(item);
        expect(getByText('Button')).toBeInTheDocument();

        fireEvent.keyDown(trigger, { key: 'Escape' });
        expect(queryByText('Button')).toBeNull();

        fireEvent.mouseLeave(item);
        expect(queryByText('Button')).toBeNull();
    });

    test('links keep native link semantics and trigger omits aria-selected', () => {
        const { getByText } = render(
            <NavigationMenu.Root defaultValue="components">
                <NavigationMenu.Item value="components">
                    <NavigationMenu.Trigger>Components</NavigationMenu.Trigger>
                    <NavigationMenu.Content>
                        <NavigationMenu.Link href="/docs/components/button">Button</NavigationMenu.Link>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>
            </NavigationMenu.Root>
        );

        const link = getByText('Button');
        expect(link.tagName).toBe('A');
        expect(link).toHaveAttribute('href', '/docs/components/button');
        expect(link).not.toHaveAttribute('role');
        expect(link).not.toHaveAttribute('type');
        expect(link).not.toHaveAttribute('aria-selected');

        const trigger = getByText('Components');
        expect(trigger).not.toHaveAttribute('aria-selected');
        expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    test('opening content does not log Primitive asChild warnings', () => {
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const { getByText } = renderMenu();
        fireEvent.click(getByText('Components'));
        expect(warnSpy).not.toHaveBeenCalled();
        warnSpy.mockRestore();
    });
    test('pointer click right after hover-open keeps content open; next click closes', async() => {
        const user = userEvent.setup();
        const { getByText, queryByText } = renderMenu();
        const trigger = getByText('Components');

        await user.hover(trigger);
        expect(getByText('Button')).toBeInTheDocument();

        await user.click(trigger);
        expect(getByText('Button')).toBeInTheDocument();
        expect(trigger).toHaveAttribute('aria-expanded', 'true');

        await user.click(trigger);
        expect(queryByText('Button')).toBeNull();
        expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    test('pointer click opens content when not hovered and a second click closes it', () => {
        const { getByText, queryByText } = renderMenu();
        const trigger = getByText('Components');

        fireEvent.click(trigger, { detail: 1 });
        expect(getByText('Button')).toBeInTheDocument();

        fireEvent.click(trigger, { detail: 1 });
        expect(queryByText('Button')).toBeNull();
    });

    test('keyboard Enter/Space on the trigger always toggles, even after hover-open', async() => {
        const user = userEvent.setup();
        const { getByText, queryByText } = renderMenu();
        const trigger = getByText('Components');

        trigger.focus();
        await user.keyboard('{Enter}');
        expect(getByText('Button')).toBeInTheDocument();
        await user.keyboard('{Enter}');
        expect(queryByText('Button')).toBeNull();
        await user.keyboard(' ');
        expect(getByText('Button')).toBeInTheDocument();
        await user.keyboard(' ');
        expect(queryByText('Button')).toBeNull();

        await user.hover(trigger);
        expect(getByText('Button')).toBeInTheDocument();
        trigger.focus();
        await user.keyboard('{Enter}');
        expect(queryByText('Button')).toBeNull();
    });

    test('ArrowDown/ArrowUp move between links in a vertical panel', async() => {
        const user = userEvent.setup();
        const { getByText } = render(
            <NavigationMenu.Root defaultValue="item1">
                <NavigationMenu.Item value="item1">
                    <NavigationMenu.Trigger>Open</NavigationMenu.Trigger>
                    <NavigationMenu.Content>
                        <NavigationMenu.Link href="#link-1">Link 1</NavigationMenu.Link>
                        <NavigationMenu.Link href="#link-2">Link 2</NavigationMenu.Link>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>
            </NavigationMenu.Root>
        );

        await user.tab();
        await user.tab();
        expect(getByText('Link 1')).toHaveFocus();
        await user.keyboard('{ArrowDown}');
        expect(getByText('Link 2')).toHaveFocus();
        await user.keyboard('{ArrowUp}');
        expect(getByText('Link 1')).toHaveFocus();
    });

    test('content closes when keyboard focus leaves the item', async() => {
        const user = userEvent.setup();
        const { getByText, queryByText, getByTestId } = render(
            <>
                <NavigationMenu.Root>
                    <NavigationMenu.Item value="components">
                        <NavigationMenu.Trigger>Components</NavigationMenu.Trigger>
                        <NavigationMenu.Content>
                            <NavigationMenu.Link href="#button">Button</NavigationMenu.Link>
                        </NavigationMenu.Content>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item value="docs">
                        <NavigationMenu.Link href="#docs">Docs</NavigationMenu.Link>
                    </NavigationMenu.Item>
                </NavigationMenu.Root>
                <button data-testid="after">After</button>
            </>
        );
        const trigger = getByText('Components');

        // Arrowing to the next top-level entry closes the panel.
        trigger.focus();
        await user.keyboard('{Enter}');
        expect(getByText('Button')).toBeInTheDocument();
        await user.keyboard('{ArrowRight}');
        expect(getByText('Docs')).toHaveFocus();
        expect(queryByText('Button')).toBeNull();
        expect(trigger).toHaveAttribute('aria-expanded', 'false');

        // Tabbing from the trigger into the panel keeps it open; tabbing past it closes it.
        trigger.focus();
        await user.keyboard('{Enter}');
        await user.tab();
        expect(getByText('Button')).toHaveFocus();
        await user.tab();
        expect(getByTestId('after')).toHaveFocus();
        expect(queryByText('Button')).toBeNull();
    });

    test('hover-opened content stays open when focus moves elsewhere without entering it', () => {
        const { getByText } = render(
            <>
                <NavigationMenu.Root>
                    <NavigationMenu.Item value="components">
                        <NavigationMenu.Trigger>Components</NavigationMenu.Trigger>
                        <NavigationMenu.Content>
                            <NavigationMenu.Link href="#button">Button</NavigationMenu.Link>
                        </NavigationMenu.Content>
                    </NavigationMenu.Item>
                </NavigationMenu.Root>
                <button>Other</button>
            </>
        );
        fireEvent.mouseEnter(getByText('Components').parentElement as HTMLElement);
        expect(getByText('Button')).toBeInTheDocument();
        getByText('Other').focus();
        expect(getByText('Button')).toBeInTheDocument();
    });

    test('selecting a link inside the panel closes it, even when the consumer prevents default', () => {
        const onClick = jest.fn((event: React.MouseEvent) => event.preventDefault());
        const { getByText, queryByText } = render(
            <NavigationMenu.Root>
                <NavigationMenu.Item value="components">
                    <NavigationMenu.Trigger>Components</NavigationMenu.Trigger>
                    <NavigationMenu.Content>
                        <NavigationMenu.Link href="#button" onClick={onClick}>Button</NavigationMenu.Link>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>
            </NavigationMenu.Root>
        );
        const trigger = getByText('Components');
        fireEvent.click(trigger);
        fireEvent.click(getByText('Button'));
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(queryByText('Button')).toBeNull();
        expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });
});
