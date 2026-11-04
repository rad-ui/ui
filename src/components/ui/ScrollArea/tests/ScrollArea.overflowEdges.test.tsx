import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ScrollArea from '../ScrollArea';

const setBox = (element: HTMLElement, box: Record<string, number>) => {
    Object.entries(box).forEach(([key, value]) => {
        Object.defineProperty(element, key, { configurable: true, writable: true, value });
    });
};

describe('ScrollArea overflow edges', () => {
    test('marks the edges that have hidden content as it scrolls', () => {
        render(
            <ScrollArea.Root data-testid="root">
                <ScrollArea.Viewport data-testid="viewport">
                    <div style={{ height: 1000 }}>Long content</div>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar orientation="vertical">
                    <ScrollArea.Thumb />
                </ScrollArea.Scrollbar>
            </ScrollArea.Root>
        );
        const root = screen.getByTestId('root');
        const viewport = screen.getByTestId('viewport');
        setBox(viewport, { scrollHeight: 1000, clientHeight: 200, scrollTop: 0, scrollWidth: 300, clientWidth: 300, scrollLeft: 0 });

        fireEvent.scroll(viewport);
        expect(root).not.toHaveAttribute('data-overflow-y-start');
        expect(root).toHaveAttribute('data-overflow-y-end');
        expect(root.style.getPropertyValue('--scroll-area-overflow-y-end')).toBe('800px');
        expect(root).not.toHaveAttribute('data-overflow-x-end');

        setBox(viewport, { scrollTop: 300 });
        fireEvent.scroll(viewport);
        expect(root).toHaveAttribute('data-overflow-y-start');
        expect(root.style.getPropertyValue('--scroll-area-overflow-y-start')).toBe('300px');
        expect(viewport).toHaveAttribute('data-overflow-y-end');

        setBox(viewport, { scrollTop: 800 });
        fireEvent.scroll(viewport);
        expect(root).not.toHaveAttribute('data-overflow-y-end');
    });

    test('overflowEdgeThreshold delays the attributes, as one number or per edge', () => {
        const renderArea = (threshold: React.ComponentProps<typeof ScrollArea.Root>['overflowEdgeThreshold']) => render(
            <ScrollArea.Root data-testid="root" overflowEdgeThreshold={threshold}>
                <ScrollArea.Viewport data-testid="viewport">
                    <div style={{ height: 1000 }}>Long content</div>
                </ScrollArea.Viewport>
            </ScrollArea.Root>
        );
        const { unmount } = renderArea(40);
        let root = screen.getByTestId('root');
        let viewport = screen.getByTestId('viewport');
        setBox(viewport, { scrollHeight: 1000, clientHeight: 200, scrollTop: 30, scrollWidth: 300, clientWidth: 300, scrollLeft: 0 });
        fireEvent.scroll(viewport);
        expect(root).not.toHaveAttribute('data-overflow-y-start');
        expect(root.style.getPropertyValue('--scroll-area-overflow-y-start')).toBe('30px');
        setBox(viewport, { scrollTop: 50 });
        fireEvent.scroll(viewport);
        expect(root).toHaveAttribute('data-overflow-y-start');
        unmount();

        renderArea({ yEnd: 900 });
        root = screen.getByTestId('root');
        viewport = screen.getByTestId('viewport');
        setBox(viewport, { scrollHeight: 1000, clientHeight: 200, scrollTop: 30, scrollWidth: 300, clientWidth: 300, scrollLeft: 0 });
        fireEvent.scroll(viewport);
        expect(root).toHaveAttribute('data-overflow-y-start');
        expect(root).not.toHaveAttribute('data-overflow-y-end');
    });
});
