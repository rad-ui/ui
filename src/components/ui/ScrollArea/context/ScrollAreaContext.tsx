import { createContext, RefObject } from 'react';

interface ScrollAreaContextType {
    rootClass: string;
    scrollXThumbRef?: RefObject<HTMLDivElement>;
    scrollAreaViewportRef?: RefObject<HTMLDivElement>;
    handleScroll?: () => void;
}

export const ScrollAreaContext = createContext<ScrollAreaContextType>({
    rootClass: ''
});
