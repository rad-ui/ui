import { createContext } from 'react';

export interface MinimapContextValue {
  rootClass: string;
  rootRef: React.RefObject<HTMLDivElement> | null;
}

const MinimapContext = createContext<MinimapContextValue>({
    rootClass: '',
    rootRef: null
});

export default MinimapContext;
