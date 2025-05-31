'use client';

import { createContext, RefObject } from 'react';

interface ScrollAreaContextType {
    rootClass: string;
    scrollXThumbRef?: RefObject<HTMLDivElement>;
    scrollAreaViewportRef?: RefObject<HTMLDivElement>;
    handleScroll?: () => void;
    handleScrollbarClick?: (e : { clientY: any; }) => void;
}

export const ScrollAreaContext = createContext<ScrollAreaContextType>({
    rootClass: ''
});
