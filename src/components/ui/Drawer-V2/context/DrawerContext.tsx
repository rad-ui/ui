import { createContext } from 'react';

export type DrawerSnapPoint = number | string;

export type DrawerRootActions = {
    close: () => void;
    unmount: () => void;
};

export type DrawerContextType = {
    rootClass: string;
    swipeDirection: 'left' | 'right' | 'top' | 'bottom';
    // Snap point state
    snapPoints: DrawerSnapPoint[];
    activeSnapPoint: DrawerSnapPoint | null;
    setActiveSnapPoint: (point: DrawerSnapPoint | null) => void;
    // Modal mode
    modal: boolean | 'trap-focus';
    // Disable outside-click dismissal
    disablePointerDismissal: boolean;
    // Callback after open/close animation completes
    onOpenChangeComplete?: (open: boolean) => void;
    // Imperative actions ref setter (internal)
    registerActions: (actions: DrawerRootActions) => void;
    // Marks the next close as intentional (bypasses disablePointerDismissal guard)
    markIntentionalClose: () => void;
    // Number of currently-open child drawers (used by DrawerContent to widen itself)
    childOpenCount: number;
};

export const DrawerContext = createContext<DrawerContextType>({
    rootClass: '',
    swipeDirection: 'right',
    snapPoints: [],
    activeSnapPoint: null,
    setActiveSnapPoint: () => {},
    modal: true,
    disablePointerDismissal: false,
    onOpenChangeComplete: undefined,
    registerActions: () => {},
    markIntentionalClose: () => {},
    childOpenCount: 0,
});
