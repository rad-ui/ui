import { createContext } from 'react';

export interface MinimapProviderContextValue {
    visibleItems: string[];
    handleInView: (value: string | null) => void;
    handleOutView: (value: string | null) => void;
}
const MinimapProviderContext = createContext<MinimapProviderContextValue | null>({
    visibleItems: [],
    handleInView: () => { },
    handleOutView: () => { }
});

export default MinimapProviderContext;
