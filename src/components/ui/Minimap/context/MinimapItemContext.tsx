import { createContext } from 'react';

export interface MinimapItemContextValue {
    value: string;
    isVisible: boolean;
}

const MinimapItemContext = createContext<MinimapItemContextValue | null>({
    value: '',
    isVisible: false
});

export default MinimapItemContext;
