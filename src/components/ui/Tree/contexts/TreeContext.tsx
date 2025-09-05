import { createContext, MutableRefObject } from 'react';

export interface TreeContextProps {
    rootClass: string;
    treeRef: MutableRefObject<HTMLElement | null>;
}

export const TreeContext = createContext<TreeContextProps>({
    rootClass: '',
    treeRef: { current: null }
});
