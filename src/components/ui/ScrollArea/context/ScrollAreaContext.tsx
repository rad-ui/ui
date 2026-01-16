'use client';

import { createContext, RefObject } from 'react';

interface ScrollAreaContextType {
    rootClass: string;
    scrollYThumbRef?: RefObject<HTMLDivElement>;
    scrollXThumbRef?: RefObject<HTMLDivElement>;
    scrollAreaViewportRef?: RefObject<HTMLDivElement>;
    handleScroll?: () => void;
    handleScrollbarClick?: (e : { clientX?: any; clientY?: any; orientation: 'vertical' | 'horizontal' }) => void;
    type: 'auto' | 'always' | 'scroll' | 'hover';
    rootRef?: RefObject<HTMLDivElement>;
}

export const ScrollAreaContext = createContext<ScrollAreaContextType>({
    rootClass: '',
    type: 'hover'
});
