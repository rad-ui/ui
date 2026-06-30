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
}

export const ScrollAreaContext = createContext<ScrollAreaContextType>({
    rootClass: '',
    type: 'hover',
    scrollbarVisible: false,
    overflow: { x: false, y: false },
    overlaySuppressesScrollbar: false
});
