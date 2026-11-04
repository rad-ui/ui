import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NavigationMenu from '../NavigationMenu';
import type { PopupActions } from '~/core/hooks/usePopupActions';

const Menu = (props: Partial<React.ComponentProps<typeof NavigationMenu.Root>> & { disabled?: boolean; linkProps?: Record<string, unknown> }) => {
    const { disabled, linkProps, ...rootProps } = props;
    return (
        <NavigationMenu.Root {...rootProps}>
            <NavigationMenu.Item value="docs">
                <NavigationMenu.Trigger disabled={disabled}>Docs</NavigationMenu.Trigger>
                <NavigationMenu.Content>
                    <NavigationMenu.Link href="/a" {...linkProps}>Guide</NavigationMenu.Link>
                </NavigationMenu.Content>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="blog">
                <NavigationMenu.Trigger>Blog</NavigationMenu.Trigger>
                <NavigationMenu.Content>
                    <NavigationMenu.Link href="/b">Posts</NavigationMenu.Link>
                </NavigationMenu.Content>
            </NavigationMenu.Item>
        </NavigationMenu.Root>
    );
};

describe('NavigationMenu options', () => {
    afterEach(() => jest.useRealTimers());

    test('delay holds the first hover-open', () => {
        jest.useFakeTimers();
        render(<Menu delay={200} />);
        fireEvent.mouseEnter(screen.getByText('Docs').closest('div')!);
        expect(screen.queryByText('Guide')).not.toBeInTheDocument();
        act(() => { jest.advanceTimersByTime(210); });
        expect(screen.getByText('Guide')).toBeInTheDocument();
    });

    test('closeDelay sets how long it lingers', () => {
        jest.useFakeTimers();
        render(<Menu closeDelay={500} />);
        const item = screen.getByText('Docs').closest('div')!;
        fireEvent.mouseEnter(item);
        fireEvent.mouseLeave(item);
        act(() => { jest.advanceTimersByTime(300); });
        expect(screen.getByText('Guide')).toBeInTheDocument();
        act(() => { jest.advanceTimersByTime(300); });
        expect(screen.queryByText('Guide')).not.toBeInTheDocument();
    });

    test('a disabled trigger does not open on hover', () => {
        render(<Menu disabled />);
        fireEvent.mouseEnter(screen.getByText('Docs').closest('div')!);
        expect(screen.queryByText('Guide')).not.toBeInTheDocument();
        expect(screen.getByText('Docs')).toHaveAttribute('data-disabled');
    });

    test('vertical: ArrowDown moves between triggers, ArrowRight opens the panel', async() => {
        const user = userEvent.setup();
        render(<Menu orientation="vertical" />);
        screen.getByText('Docs').focus();
        await user.keyboard('{ArrowDown}');
        expect(screen.getByText('Blog')).toHaveFocus();
        await user.keyboard('{ArrowRight}');
        expect(screen.getByText('Posts')).toHaveFocus();
    });

    test('active link and closeOnClick={false}', async() => {
        const user = userEvent.setup();
        render(<Menu defaultValue="docs" linkProps={{ active: true, closeOnClick: false, onClick: (e: React.MouseEvent) => e.preventDefault() }} />);
        const link = screen.getByText('Guide');
        expect(link).toHaveAttribute('aria-current', 'page');
        await user.click(link);
        expect(screen.getByText('Guide')).toBeInTheDocument();
    });

    test('actionsRef.close() and onOpenChangeComplete', () => {
        const ref = React.createRef<PopupActions>();
        const onOpenChangeComplete = jest.fn();
        render(<Menu defaultValue="docs" actionsRef={ref} onOpenChangeComplete={onOpenChangeComplete} />);
        act(() => ref.current!.close());
        expect(screen.queryByText('Guide')).not.toBeInTheDocument();
        expect(onOpenChangeComplete).toHaveBeenCalledWith(false);
    });
});
