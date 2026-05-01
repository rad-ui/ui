import React from 'react';
import { render, screen } from '@testing-library/react';

import ScrollArea from '../ScrollArea';

// Mock ResizeObserver for jsdom
global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
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
});
