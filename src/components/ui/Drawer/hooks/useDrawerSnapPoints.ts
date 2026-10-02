'use client';

import { useEffect, useMemo, useState } from 'react';
import {
    DrawerSnapPoint,
    DismissDirection,
    ResolvedSnapPoint,
    clamp,
    resolveSnapPointPixels,
    resolveSnapPoints,
} from '../utils/drawerMath';

function readViewportSize() {
    if (typeof window === 'undefined') return 0;
    return window.innerHeight || document.documentElement.clientHeight || 0;
}

function readRootFontSize() {
    if (typeof window === 'undefined') return 16;
    const parsed = Number.parseFloat(window.getComputedStyle(document.documentElement).fontSize);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 16;
}

export type UseDrawerSnapPointsResult = {
    /** Snap points resolved to px offsets, de-duplicated. */
    resolved: ResolvedSnapPoint[];
    /** The active snap point, matched by value or by nearest height. */
    active: ResolvedSnapPoint | null;
    /** Distance from fully expanded to the active snap point, in px. */
    activeOffset: number;
    /** `data-expanded` state: the active point is the full-height one. */
    expanded: boolean;
};

/**
 * Resolves snap points against the measured popup so they can drive both the
 * snap offset and the drag-to-snap release decision.
 *
 * Snap points only apply to vertical drawers, matching the gesture model: a
 * horizontal drawer has no meaningful set of resting heights.
 */
export function useDrawerSnapPoints(
    snapPoints: DrawerSnapPoint[],
    dismissDirection: DismissDirection,
    popupHeight: number,
    activeSnapPoint: DrawerSnapPoint | null,
): UseDrawerSnapPointsResult {
    const vertical = dismissDirection === 'up' || dismissDirection === 'down';

    const [viewportSize, setViewportSize] = useState(0);
    const [rootFontSize, setRootFontSize] = useState(16);

    useEffect(() => {
        if (!vertical || !snapPoints.length) return;

        setViewportSize(readViewportSize());
        setRootFontSize(readRootFontSize());

        const onResize = () => {
            setViewportSize(readViewportSize());
            setRootFontSize(readRootFontSize());
        };

        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [snapPoints.length, vertical]);

    const resolved = useMemo(() => {
        if (!vertical || !snapPoints.length) return [] as ResolvedSnapPoint[];
        return resolveSnapPoints(snapPoints, viewportSize || popupHeight, popupHeight, rootFontSize);
    }, [popupHeight, rootFontSize, snapPoints, vertical, viewportSize]);

    return useMemo(() => {
        if (!resolved.length || activeSnapPoint === null) {
            return { resolved, active: null, activeOffset: 0, expanded: false };
        }

        // Match the exact value first, so `'148px'` and `148` stay distinct.
        const exact = resolved.find((point) => Object.is(point.value, activeSnapPoint));
        if (exact) {
            return { resolved, active: exact, activeOffset: exact.offset, expanded: activeSnapPoint === 1 };
        }

        // Otherwise fall back to the closest point by height, which covers a
        // controlled value expressed in a different but equivalent unit.
        const pixels = resolveSnapPointPixels(activeSnapPoint, viewportSize || popupHeight, rootFontSize);
        if (pixels === null) {
            return { resolved, active: null, activeOffset: 0, expanded: false };
        }

        const limit = popupHeight || viewportSize;
        const height = clamp(pixels, 0, limit || pixels);
        const offset = Math.max(0, (popupHeight || height) - height);

        return { resolved, active: null, activeOffset: offset, expanded: activeSnapPoint === 1 };
    }, [activeSnapPoint, popupHeight, resolved, rootFontSize, viewportSize]);
}
