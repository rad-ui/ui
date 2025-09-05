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
});
