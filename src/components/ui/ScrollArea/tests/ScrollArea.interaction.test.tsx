import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';

import ScrollArea from '../ScrollArea';

global.ResizeObserver = jest.fn().mockImplementation((callback: ResizeObserverCallback) => ({
    observe: jest.fn((target: Element) => {
        callback([{ target } as ResizeObserverEntry], {} as ResizeObserver);
    }),
    unobserve: jest.fn(),
    disconnect: jest.fn()
})) as unknown as typeof ResizeObserver;

const defineSize = (el: HTMLElement, sizes: Record<string, number>) => {
    Object.entries(sizes).forEach(([key, value]) => {
        Object.defineProperty(el, key, { configurable: true, value });
    });
};

const renderVertical = (extra?: { scrollbarProps?: Record<string, unknown>; viewportProps?: Record<string, unknown>; type?: 'always' | 'auto' | 'hover' | 'scroll' }) => render(
    <ScrollArea.Root type={extra?.type ?? 'always'}>
        <ScrollArea.Viewport data-testid="viewport" {...extra?.viewportProps}>
            <div style={{ height: 400 }}>content</div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar data-testid="scrollbar" orientation="vertical" {...extra?.scrollbarProps}>
            <ScrollArea.Thumb data-testid="thumb" />
        </ScrollArea.Scrollbar>
    </ScrollArea.Root>
);

const layoutVertical = () => {
    const viewport = screen.getByTestId('viewport');
    const scrollbar = screen.getByTestId('scrollbar');
    defineSize(viewport, { clientHeight: 100, scrollHeight: 400, clientWidth: 100, scrollWidth: 100 });
    defineSize(scrollbar, { clientHeight: 104, clientWidth: 10 });
    act(() => {
        window.dispatchEvent(new Event('resize'));
    });
    return { viewport, scrollbar, thumb: screen.getByTestId('thumb') };
};

describe('ScrollArea interactions', () => {
    test('sizes and positions the thumb within the scrollbar track (minus padding)', () => {
        renderVertical({ scrollbarProps: { style: { padding: 2 } } });
        const { viewport, thumb } = layoutVertical();

        // track = 104 - 2 - 2 = 100; thumb = 100 * (100 / 400) = 25
        expect(thumb.style.height).toBe('25px');
        defineSize(thumb, { clientHeight: 25 }); // jsdom has no layout

        act(() => {
            viewport.scrollTop = 300; // max scroll
            fireEvent.scroll(viewport);
        });
        // thumb ends flush with the end of the track: 100 - 25
        expect(thumb.style.top).toBe('75px');
    });

    test('a consumer style on Scrollbar does not override the hidden display when not overflowing', () => {
        render(
            <ScrollArea.Root type="auto">
                <ScrollArea.Viewport data-testid="viewport"><div>short</div></ScrollArea.Viewport>
                <ScrollArea.Scrollbar data-testid="scrollbar" orientation="vertical" style={{ background: 'red' }}>
                    <ScrollArea.Thumb />
                </ScrollArea.Scrollbar>
            </ScrollArea.Root>
        );
        const scrollbar = screen.getByTestId('scrollbar');
        expect(scrollbar.style.display).toBe('none');
        expect(scrollbar.style.background).toBe('red');
    });

    test('a consumer onScroll on Viewport is called and the thumb still tracks scroll', () => {
        const onScroll = jest.fn();
        renderVertical({ viewportProps: { onScroll } });
        const { viewport, thumb } = layoutVertical();

        act(() => {
            viewport.scrollTop = 150;
            fireEvent.scroll(viewport);
        });

        expect(onScroll).toHaveBeenCalledTimes(1);
        expect(thumb.style.top).not.toBe('0px');
        expect(thumb.style.top).not.toBe('');
    });

    test('wheel over the scrollbar scrolls the viewport and does not leak to the page', () => {
        renderVertical();
        const { viewport, scrollbar } = layoutVertical();

        const event = new WheelEvent('wheel', { deltaY: 40, bubbles: true, cancelable: true });
        act(() => {
            scrollbar.dispatchEvent(event);
        });
        expect(viewport.scrollTop).toBe(40);
        expect(event.defaultPrevented).toBe(true);

        // At the top edge, an upward wheel cannot scroll the viewport, so the page keeps it.
        viewport.scrollTop = 0;
        const upEvent = new WheelEvent('wheel', { deltaY: -40, bubbles: true, cancelable: true });
        act(() => {
            scrollbar.dispatchEvent(upEvent);
        });
        expect(upEvent.defaultPrevented).toBe(false);
    });

    test('press, release, press-and-hold on the track never leaves an orphaned interval', () => {
        jest.useFakeTimers();
        const setIntervalSpy = jest.spyOn(global, 'setInterval');
        const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
        try {
            renderVertical();
            const { scrollbar, thumb } = layoutVertical();
            thumb.getBoundingClientRect = () => ({ top: 0, bottom: 25, left: 0, right: 10, width: 10, height: 25, x: 0, y: 0, toJSON: () => ({}) });

            fireEvent.mouseDown(scrollbar, { button: 0, clientY: 90 });
            act(() => { jest.advanceTimersByTime(100); });
            fireEvent.mouseUp(scrollbar);
            fireEvent.mouseDown(scrollbar, { button: 0, clientY: 90 });
            act(() => { jest.advanceTimersByTime(400); });
            fireEvent.mouseUp(scrollbar);

            const created = setIntervalSpy.mock.results.map((result) => result.value);
            const cleared = clearIntervalSpy.mock.calls.map(([id]) => id);
            expect(created.length).toBe(1);
            created.forEach((id) => expect(cleared).toContain(id));
        } finally {
            setIntervalSpy.mockRestore();
            clearIntervalSpy.mockRestore();
            jest.useRealTimers();
        }
    });

    test('thumb drag (pointer events: mouse, touch, pen) uses document listeners only while dragging', () => {
        renderVertical({ scrollbarProps: { style: { padding: 2 } } });
        const { viewport, thumb } = layoutVertical();
        defineSize(thumb, { clientHeight: 25 });

        const addSpy = jest.spyOn(document, 'addEventListener');
        const removeSpy = jest.spyOn(document, 'removeEventListener');
        try {
            fireEvent.pointerDown(thumb, { button: 0, clientY: 10, pointerId: 1, pointerType: 'touch', isPrimary: true });
            expect(addSpy.mock.calls.filter(([type]) => type === 'pointermove').length).toBe(1);
            expect(thumb).toHaveAttribute('data-dragging');
            expect(thumb.style.touchAction).toBe('none');

            // scrollable track = 100 - 25 = 75px for 300px of scroll
            fireEvent.pointerMove(document, { clientY: 10 + 37.5, pointerId: 1 });
            expect(viewport.scrollTop).toBe(150);

            fireEvent.pointerUp(document, { pointerId: 1 });
            expect(removeSpy.mock.calls.filter(([type]) => type === 'pointermove').length).toBe(1);
            expect(thumb).not.toHaveAttribute('data-dragging');

            fireEvent.pointerMove(document, { clientY: 200, pointerId: 1 });
            expect(viewport.scrollTop).toBe(150);
        } finally {
            addSpy.mockRestore();
            removeSpy.mockRestore();
        }
    });

    test('a thumb press does not page the track', () => {
        renderVertical();
        const { viewport, thumb } = layoutVertical();
        fireEvent.mouseDown(thumb, { button: 0, clientY: 90 });
        expect(viewport.scrollTop).toBe(0);
    });

    test('type="hover" keeps the scrollbar visible while the thumb is dragged outside the root', () => {
        jest.useFakeTimers();
        try {
            render(
                <ScrollArea.Root data-testid="root" type="hover">
                    <ScrollArea.Viewport data-testid="viewport"><div style={{ height: 400 }}>content</div></ScrollArea.Viewport>
                    <ScrollArea.Scrollbar data-testid="scrollbar" orientation="vertical"><ScrollArea.Thumb data-testid="thumb" /></ScrollArea.Scrollbar>
                </ScrollArea.Root>
            );
            layoutVertical();
            const root = screen.getByTestId('root');
            const scrollbar = screen.getByTestId('scrollbar');

            fireEvent.mouseEnter(root);
            expect(scrollbar).toHaveAttribute('data-state', 'visible');

            fireEvent.pointerDown(screen.getByTestId('thumb'), { button: 0, clientY: 10, pointerId: 1, pointerType: 'mouse' });
            fireEvent.mouseLeave(root);
            act(() => { jest.advanceTimersByTime(2000); });
            expect(scrollbar).toHaveAttribute('data-state', 'visible');

            fireEvent.pointerUp(document, { pointerId: 1 });
            act(() => { jest.advanceTimersByTime(2000); });
            expect(scrollbar).toHaveAttribute('data-state', 'hidden');
        } finally {
            jest.useRealTimers();
        }
    });

    test('viewport becomes a tab stop only when it scrolls and has no focusable content', async() => {
        const { rerender } = render(
            <ScrollArea.Root type="always">
                <ScrollArea.Viewport data-testid="viewport"><p>text only</p></ScrollArea.Viewport>
            </ScrollArea.Root>
        );
        const viewport = screen.getByTestId('viewport');
        // not scrollable yet
        expect(viewport).not.toHaveAttribute('tabindex');

        defineSize(viewport, { clientHeight: 100, scrollHeight: 400, clientWidth: 100, scrollWidth: 100 });
        act(() => { window.dispatchEvent(new Event('resize')); });
        expect(viewport).toHaveAttribute('tabindex', '0');

        rerender(
            <ScrollArea.Root type="always">
                <ScrollArea.Viewport data-testid="viewport"><p>text <a href="#x">link</a></p></ScrollArea.Viewport>
            </ScrollArea.Root>
        );
        await waitFor(() => {
            expect(screen.getByTestId('viewport')).not.toHaveAttribute('tabindex');
        });
    });

    test('a consumer tabIndex on Viewport wins', () => {
        render(
            <ScrollArea.Root>
                <ScrollArea.Viewport data-testid="viewport" tabIndex={-1}><p>text</p></ScrollArea.Viewport>
            </ScrollArea.Root>
        );
        const viewport = screen.getByTestId('viewport');
        defineSize(viewport, { clientHeight: 100, scrollHeight: 400, clientWidth: 100, scrollWidth: 100 });
        act(() => { window.dispatchEvent(new Event('resize')); });
        expect(viewport).toHaveAttribute('tabindex', '-1');
    });

    test('marks the corner and both tracks only when both scrollbars are rendered', () => {
        const { rerender } = render(
            <ScrollArea.Root type="always">
                <ScrollArea.Viewport><div>content</div></ScrollArea.Viewport>
                <ScrollArea.Scrollbar data-testid="y" orientation="vertical"><ScrollArea.Thumb /></ScrollArea.Scrollbar>
                <ScrollArea.Corner data-testid="corner" />
            </ScrollArea.Root>
        );
        expect(screen.getByTestId('y')).not.toHaveAttribute('data-corner');
        expect(screen.getByTestId('corner')).toHaveAttribute('data-state', 'hidden');

        rerender(
            <ScrollArea.Root type="always">
                <ScrollArea.Viewport><div>content</div></ScrollArea.Viewport>
                <ScrollArea.Scrollbar data-testid="y" orientation="vertical"><ScrollArea.Thumb /></ScrollArea.Scrollbar>
                <ScrollArea.Scrollbar data-testid="x" orientation="horizontal"><ScrollArea.Thumb /></ScrollArea.Scrollbar>
                <ScrollArea.Corner data-testid="corner" />
            </ScrollArea.Root>
        );
        expect(screen.getByTestId('y')).toHaveAttribute('data-corner');
        expect(screen.getByTestId('x')).toHaveAttribute('data-corner');
        expect(screen.getByTestId('corner')).toHaveAttribute('data-state', 'visible');
    });
});
