'use client';

import { createContext } from 'react';
import { DismissDirection, DrawerSnapPoint, ResolvedSnapPoint } from '../utils/drawerMath';

export type DrawerPopupContextType = {
    /** The popup element, once mounted. `Drawer.Handle` moves it. */
    element: HTMLElement | null;
    /** Measured height in px, used to resolve snap points and dismiss thresholds. */
    height: number;

    // ── Snap points ──────────────────────────────────────────────────────────
    /** Snap points resolved against the measured height. Empty when unusable. */
    resolvedSnapPoints: ResolvedSnapPoint[];
    /** Distance from the fully expanded position to the active snap point, px. */
    activeSnapPointOffset: number;
    /** The active snap point's public value, or `null` when fully expanded. */
    activeSnapPoint: DrawerSnapPoint | null;
    /** Changes the resting snap point, honouring the controlled `snapPoint` prop. */
    setActiveSnapPoint: (point: DrawerSnapPoint | null) => void;
    /** `data-expanded`: the drawer is resting at its full height. */
    expanded: boolean;

    // ── Gesture ──────────────────────────────────────────────────────────────
    /** Direction the drawer is dismissed by. */
    dismissDirection: DismissDirection;
    /** Props for pointer (mouse/pen) input on the popup surface. */
    pointerProps: { onPointerDown: (event: React.PointerEvent<HTMLElement>) => void };
    /** Props for touch input, which needs its own path to claim the gesture. */
    touchProps: {
        onTouchStart: React.TouchEventHandler<HTMLElement>;
        onTouchMove: React.TouchEventHandler<HTMLElement>;
        onTouchEnd: React.TouchEventHandler<HTMLElement>;
        onTouchCancel: React.TouchEventHandler<HTMLElement>;
    };
};

/**
 * Popup-scoped state.
 *
 * Split out from `DrawerContext` because snap point resolution needs the measured
 * popup height, which only `Drawer.Content` observes. Keeping it here means the
 * drag maths is computed once and read by both the popup and the handle, instead
 * of being duplicated per part.
 */
export const DrawerPopupContext = createContext<DrawerPopupContextType>({
    element: null,
    height: 0,
    resolvedSnapPoints: [],
    activeSnapPointOffset: 0,
    activeSnapPoint: null,
    setActiveSnapPoint: () => {},
    expanded: false,
    dismissDirection: 'right',
    pointerProps: { onPointerDown: () => {} },
    touchProps: {
        onTouchStart: () => {},
        onTouchMove: () => {},
        onTouchEnd: () => {},
        onTouchCancel: () => {},
    },
});