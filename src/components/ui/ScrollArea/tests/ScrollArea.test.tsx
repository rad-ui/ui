import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';

import ScrollArea from '../ScrollArea';

// Mock ResizeObserver for jsdom — invoke callback when observe runs so overflow is detected
global.ResizeObserver = jest.fn().mockImplementation((callback: ResizeObserverCallback) => ({
    observe: jest.fn((target: Element) => {
        callback([{ target } as ResizeObserverEntry], {} as ResizeObserver);
    }),
    unobserve: jest.fn(),
    disconnect: jest.fn()
})) as unknown as typeof ResizeObserver;

describe('ScrollArea', () => {
    test('forwards refs and preserves accessibility', () => {
        const rootRef = React.createRef<HTMLDivElement>();
        const viewportRef = React.createRef<HTMLDivElement>();
        const scrollbarRef = React.createRef<HTMLDivElement>();
        const thumbRef = React.createRef<HTMLDivElement>();
        const cornerRef = React.createRef<HTMLDivElement>();

        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        render(
            <ScrollArea.Root ref={rootRef} style={{ height: 100 }}>
                <ScrollArea.Viewport ref={viewportRef}>
                    <div>content</div>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar ref={scrollbarRef} orientation='vertical'>
                    <ScrollArea.Thumb ref={thumbRef} />
                </ScrollArea.Scrollbar>
                <ScrollArea.Corner ref={cornerRef} />
            </ScrollArea.Root>
        );

        expect(rootRef.current).toBeInstanceOf(HTMLDivElement);
        expect(viewportRef.current).toBeInstanceOf(HTMLDivElement);
        expect(scrollbarRef.current).toBeInstanceOf(HTMLDivElement);
        expect(thumbRef.current).toBeInstanceOf(HTMLDivElement);
        expect(cornerRef.current).toBeInstanceOf(HTMLDivElement);
        expect(screen.getByText('content')).toBeInTheDocument();
        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();

        warnSpy.mockRestore();
        errorSpy.mockRestore();
    });

    test('does not emit generated part classes without a namespace', () => {
        render(
            <ScrollArea.Root data-testid="root" type="always">
                <ScrollArea.Viewport data-testid="viewport">
                    <div>content</div>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar data-testid="scrollbar" orientation="vertical">
                    <ScrollArea.Thumb data-testid="thumb" />
                </ScrollArea.Scrollbar>
                <ScrollArea.Corner data-testid="corner" />
            </ScrollArea.Root>
        );

        expect(screen.getByTestId('root').className).toBe('');
        expect(screen.getByTestId('viewport').className).toBe('');
        expect(screen.getByTestId('scrollbar').className).toBe('');
        expect(screen.getByTestId('thumb').className).toBe('');
        expect(screen.getByTestId('corner').className).toBe('');
    });

    test('emits generated part classes when customRootClass provides a namespace', () => {
        render(
            <ScrollArea.Root customRootClass="acme" data-testid="root" type="always">
                <ScrollArea.Viewport data-testid="viewport">
                    <div>content</div>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar data-testid="scrollbar" orientation="vertical">
                    <ScrollArea.Thumb data-testid="thumb" />
                </ScrollArea.Scrollbar>
                <ScrollArea.Corner data-testid="corner" />
            </ScrollArea.Root>
        );

        expect(screen.getByTestId('root')).toHaveClass('acme-scroll-area');
        expect(screen.getByTestId('viewport')).toHaveClass('acme-scroll-area-viewport');
        expect(screen.getByTestId('scrollbar')).toHaveClass('acme-scroll-area-scrollbar');
        expect(screen.getByTestId('thumb')).toHaveClass('acme-scroll-area-thumb');
        expect(screen.getByTestId('corner')).toHaveClass('acme-scroll-area-corner');
    });

    test('exposes scrollbar type on root', () => {
        render(
            <ScrollArea.Root data-testid="root" type="scroll">
                <ScrollArea.Viewport data-testid="viewport">
                    <div style={{ height: 2000 }}>content</div>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar data-testid="scrollbar" orientation="vertical">
                    <ScrollArea.Thumb data-testid="thumb" />
                </ScrollArea.Scrollbar>
            </ScrollArea.Root>
        );

        expect(screen.getByTestId('root')).toHaveAttribute('data-scrollbar-type', 'scroll');
    });

    test('type always keeps scrollbar and thumb visible', () => {
        render(
            <ScrollArea.Root type="always">
                <ScrollArea.Viewport>
                    <div>content</div>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar data-testid="scrollbar" orientation="vertical">
                    <ScrollArea.Thumb data-testid="thumb" />
                </ScrollArea.Scrollbar>
            </ScrollArea.Root>
        );

        expect(screen.getByTestId('scrollbar')).toHaveAttribute('data-state', 'visible');
        expect(screen.getByTestId('thumb')).toHaveAttribute('data-state', 'visible');
    });

    test('type scroll hides scrollbar until viewport scrolls', () => {
        render(
            <ScrollArea.Root type="scroll" style={{ height: 100 }}>
                <ScrollArea.Viewport data-testid="viewport" style={{ height: 100, overflow: 'auto' }}>
                    <div style={{ height: 400 }}>content</div>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar data-testid="scrollbar" orientation="vertical">
                    <ScrollArea.Thumb data-testid="thumb" />
                </ScrollArea.Scrollbar>
            </ScrollArea.Root>
        );

        const viewport = screen.getByTestId('viewport');
        Object.defineProperty(viewport, 'scrollHeight', { configurable: true, value: 400 });
        Object.defineProperty(viewport, 'clientHeight', { configurable: true, value: 100 });

        act(() => {
            window.dispatchEvent(new Event('resize'));
        });

        expect(screen.getByTestId('scrollbar')).toHaveAttribute('data-state', 'hidden');

        act(() => {
            viewport.scrollTop = 20;
            fireEvent.scroll(viewport);
        });

        expect(screen.getByTestId('scrollbar')).toHaveAttribute('data-state', 'visible');
        expect(screen.getByTestId('thumb')).toHaveAttribute('data-state', 'visible');
    });

    test('type hover shows scrollbar on root hover', () => {
        render(
            <ScrollArea.Root data-testid="root" type="hover" style={{ height: 100 }}>
                <ScrollArea.Viewport data-testid="viewport">
                    <div style={{ height: 400 }}>content</div>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar data-testid="scrollbar" orientation="vertical">
                    <ScrollArea.Thumb data-testid="thumb" />
                </ScrollArea.Scrollbar>
            </ScrollArea.Root>
        );

        const viewport = screen.getByTestId('viewport');
        Object.defineProperty(viewport, 'scrollHeight', { configurable: true, value: 400 });
        Object.defineProperty(viewport, 'clientHeight', { configurable: true, value: 100 });

        act(() => {
            window.dispatchEvent(new Event('resize'));
        });

        expect(screen.getByTestId('scrollbar')).toHaveAttribute('data-state', 'hidden');

        fireEvent.mouseEnter(screen.getByTestId('root'));

        expect(screen.getByTestId('scrollbar')).toHaveAttribute('data-state', 'visible');
    });

    test('resets scroll position when viewport children change', async() => {
        const scrollArea = (content: React.ReactNode) => (
            <ScrollArea.Root style={{ height: 100 }}>
                <ScrollArea.Viewport data-testid="viewport" style={{ height: 100, overflow: 'auto' }}>
                    {content}
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar data-testid="scrollbar" orientation="vertical">
                    <ScrollArea.Thumb data-testid="thumb" />
                </ScrollArea.Scrollbar>
            </ScrollArea.Root>
        );

        const { rerender } = render(scrollArea(<div key="tab-a" style={{ height: 400 }}>tab a</div>));

        const viewport = screen.getByTestId('viewport');
        Object.defineProperty(viewport, 'scrollHeight', { configurable: true, value: 400 });
        Object.defineProperty(viewport, 'clientHeight', { configurable: true, value: 100 });

        act(() => {
            viewport.scrollTop = 300;
            fireEvent.scroll(viewport);
        });

        expect(viewport.scrollTop).toBe(300);

        rerender(scrollArea(<div key="tab-b">tab b</div>));

        await waitFor(() => {
            expect(viewport.scrollTop).toBe(0);
            expect(viewport.scrollLeft).toBe(0);
        });
    });
});
