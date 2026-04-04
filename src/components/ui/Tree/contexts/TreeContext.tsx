import { createContext, MutableRefObject, RefObject } from 'react';

export interface TreeContextProps {
    rootClass: string;
    treeRef: MutableRefObject<HTMLElement | null>;
    itemRefs: Map<string, RefObject<HTMLButtonElement>>;
    registerItemRef: (id: string, ref: RefObject<HTMLButtonElement>) => void;
    unregisterItemRef: (id: string) => void;
}

export const TreeContext = createContext<TreeContextProps>({
    rootClass: '',
    treeRef: { current: null },
    itemRefs: new Map(),
    registerItemRef: () => {},
    unregisterItemRef: () => {}
});
