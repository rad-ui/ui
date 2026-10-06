'use client';

import { createContext, RefObject } from 'react';

export type ScrollAreaScrollbarType = 'auto' | 'always' | 'scroll' | 'hover';

interface ScrollAreaContextType {
    rootClass: string;
    scrollYThumbRef?: RefObject<HTMLDivElement>;
    scrollXThumbRef?: RefObject<HTMLDivElement>;
    scrollAreaViewportRef?: RefObject<HTMLDivElement>;
    handleScroll?: () => void;
    handleScrollbarClick?: (e : { clientX?: any; clientY?: any; orientation: 'vertical' | 'horizontal' }) => void;
    type: ScrollAreaScrollbarType;
    scrollbarVisible: boolean;
    overflow: { x: boolean; y: boolean };
    overlaySuppressesScrollbar: boolean;
    rootRef?: RefObject<HTMLDivElement>;
    scrollbarYRef?: RefObject<HTMLDivElement>;
    scrollbarXRef?: RefObject<HTMLDivElement>;
    /** Registers a mounted Scrollbar for an axis; returns the unregister callback. */
    registerScrollbar?: (orientation: 'vertical' | 'horizontal') => () => void;
    /** Recomputes thumb sizes and positions (e.g. after a scrollbar or thumb mounts). */
    syncThumbs?: () => void;
    /** Which axes currently render a scrollbar track. */
    scrollbarsMounted: { x: boolean; y: boolean };
    /** Marks a thumb drag in progress so auto-hiding scrollbars stay visible. */
    setInteracting?: (interacting: boolean) => void;
}

export const ScrollAreaContext = createContext<ScrollAreaContextType>({
    rootClass: '',
    type: 'hover',
    scrollbarVisible: false,
    overflow: { x: false, y: false },
    overlaySuppressesScrollbar: false,
    scrollbarsMounted: { x: false, y: false }
});

// Lets a Thumb inherit the orientation of the Scrollbar it is rendered in.
export const ScrollAreaScrollbarOrientationContext = createContext<'horizontal' | 'vertical' | undefined>(undefined);
