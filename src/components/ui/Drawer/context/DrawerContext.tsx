'use client';

import { createContext } from 'react';
import { DismissDirection, DrawerSide, DrawerSnapPoint } from '../utils/drawerMath';

export type { DrawerSnapPoint } from '../utils/drawerMath';
export type { ResolvedSnapPoint } from '../utils/drawerMath';

export type DrawerRootActions = {
    close: () => void;
    unmount: () => void;
};

export type DrawerChangeReason =
    | 'trigger-press'
    | 'outside-press'
    | 'escape-key'
    | 'close-press'
    | 'imperative-action'
    | 'swipe'
    | 'none';

export type DrawerOpenChangeEventDetails = {
    /** The reason the drawer was asked to open or close. */
    reason: DrawerChangeReason;
    /** Vetoes the pending open state change. */
    cancel: () => void;
    /** True once `cancel` has been called. */
    isCanceled: boolean;
    /**
     * Keeps the drawer mounted through this close, for externally controlled
     * close animations. Release it with `actionsRef.current.unmount()`.
     */
    preventUnmountOnClose: () => void;
    /** The DOM event behind the request, when there was one. */
    event?: Event;
};

export type DrawerContextType = {
    rootClass: string;
    /** Normalised side the drawer is docked on. Drives `data-swipe-direction`. */
    side: DrawerSide;
    /** Direction the drawer is dismissed by. */
    dismissDirection: DismissDirection;
    isOpen: boolean;
    onOpen: () => void;

    // ── Snap points ──────────────────────────────────────────────────────────
    snapPoints: DrawerSnapPoint[];
    activeSnapPoint: DrawerSnapPoint | null;
    setActiveSnapPoint: (point: DrawerSnapPoint | null) => void;
    snapToSequentialPoints: boolean;

    // ── Behaviour ────────────────────────────────────────────────────────────
    /** `true`, `false`, or `'trap-focus'`. */
    modal: boolean | 'trap-focus';
    disablePointerDismissal: boolean;
    /** True while a close is being held open for a custom exit animation. */
    shouldKeepMounted: boolean;

    // ── Close requests ───────────────────────────────────────────────────────
    /** Closes the drawer, attributing the request to a reason. */
    requestClose: (reason: DrawerChangeReason, event?: Event) => void;
    /**
     * Declares the next close as intentional, so `disablePointerDismissal`
     * does not block it. Optionally attributes the change to a reason.
     */
    markIntentionalClose: (reason?: DrawerChangeReason) => void;

    // ── Auto-wired labelling ───────────────────────────────────────────────
    /** Populated by `Drawer.Title`; wired to `aria-labelledby` unless overridden. */
    titleId?: string;
    /** Populated by `Drawer.Description`; wired to `aria-describedby` unless overridden. */
    descriptionId?: string;
    setTitleId: (id: string | undefined) => void;
    setDescriptionId: (id: string | undefined) => void;

    // ── Measurement ──────────────────────────────────────────────────────────
    /** Measured popup height in px, reported by Drawer.Content. */
    popupHeight: number;
    setPopupHeight: (height: number) => void;
    /** Internal: lets Drawer.Content hand its element to Drawer.Root. */
    registerContentElement: (element: HTMLElement | null) => void;

    // ── Nesting ──────────────────────────────────────────────────────────────
    /** Number of currently open child drawers. */
    childOpenCount: number;
    /** True while a child drawer is being swiped. */
    nestedSwiping: boolean;
    setNestedSwiping: (swiping: boolean) => void;
    /** Nesting depth, 0 for a top-level drawer. */
    depth: number;
};

export const DrawerContext = createContext<DrawerContextType>({
    rootClass: '',
    side: 'right',
    dismissDirection: 'right',
    isOpen: false,
    onOpen: () => {},
    snapPoints: [],
    activeSnapPoint: null,
    setActiveSnapPoint: () => {},
    snapToSequentialPoints: false,
    modal: true,
    disablePointerDismissal: false,
    shouldKeepMounted: false,
    requestClose: () => {},
    markIntentionalClose: () => {},
    setTitleId: () => {},
    setDescriptionId: () => {},
    popupHeight: 0,
    setPopupHeight: () => {},
    registerContentElement: () => {},
    childOpenCount: 0,
    nestedSwiping: false,
    setNestedSwiping: () => {},
    depth: 0,
});
