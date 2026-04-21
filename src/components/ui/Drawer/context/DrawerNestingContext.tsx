'use client';
import { createContext, useContext } from 'react';

export type DrawerNestingContextType = {
    /** Nesting depth of this drawer (0 = root). */
    depth: number;
    /** Called by a child drawer when it opens/closes. */
    onChildOpenChange: (open: boolean) => void;
};

export const DrawerNestingContext = createContext<DrawerNestingContextType>({
    depth: 0,
    onChildOpenChange: () => {},
});

export function useDrawerNesting() {
    return useContext(DrawerNestingContext);
}
