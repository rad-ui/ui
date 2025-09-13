import { createContext, RefObject } from 'react';

export interface MinimapContextValue {
  rootClass: string;
  rootRef: RefObject<HTMLDivElement> | null;
}

const MinimapContext = createContext<MinimapContextValue>({
    rootClass: '',
    rootRef: null
});

export default MinimapContext;
