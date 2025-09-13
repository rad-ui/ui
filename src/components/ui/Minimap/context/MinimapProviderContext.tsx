import { createContext } from 'react';

export interface MinimapProviderContextValue {
    visibleItems: string[];
    handleInView: (value: string | null) => void;
    handleOutView: (value: string | null) => void;
    scrollToItem: (value: string) => void;
    registerRef: (value: string, element: HTMLElement | null) => void;
}
const MinimapProviderContext = createContext<MinimapProviderContextValue>({
    visibleItems: [],
    handleInView: () => { },
    handleOutView: () => { },
    scrollToItem: () => { },
    registerRef: () => { }
});

export default MinimapProviderContext;
