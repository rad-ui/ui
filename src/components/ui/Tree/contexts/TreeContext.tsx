import { createContext, MutableRefObject, RefObject } from 'react';

export interface TreeContextProps {
    rootClass: string;
    treeRef: MutableRefObject<HTMLElement | null>;
    itemRefs: Map<string, RefObject<HTMLButtonElement>>;
    registerItemRef: (id: string, ref: RefObject<HTMLButtonElement>) => void;
    unregisterItemRef: (id: string) => void;
    dir?: 'ltr' | 'rtl';
    /** Set when the Root manages expansion (`expanded` / `defaultExpanded`). */
    expansion?: {
        isExpanded: (key: string) => boolean;
        setExpanded: (key: string, expanded: boolean) => void;
    };
}

export const TreeContext = createContext<TreeContextProps>({
    rootClass: '',
    treeRef: { current: null },
    itemRefs: new Map(),
    registerItemRef: () => {},
    unregisterItemRef: () => {}
});
