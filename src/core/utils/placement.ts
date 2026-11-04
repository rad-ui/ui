import type { Placement, VirtualElement, Middleware, Padding, Boundary } from '@floating-ui/react';
import { flip, shift, limitShift, autoUpdate } from '@floating-ui/react';
import type * as React from 'react';

export type Side = 'top' | 'right' | 'bottom' | 'left';
export type Align = 'start' | 'center' | 'end';

/** CSS position used for the floating element. */
export type PositionMethod = 'absolute' | 'fixed';

/**
 * How a floating part avoids colliding with its boundary.
 * - `side`: `flip` moves it to the opposite side when it doesn't fit; `shift` keeps the side and slides it
 *   back into the boundary; `none` does nothing.
 * - `align`: `shift` slides it along the anchor, `flip` swaps start/end, `none` does neither.
 * - `fallbackAxisSide`: when neither side fits, try the perpendicular axis (`start`/`end`), or not (`none`).
 */
export type CollisionAvoidance = {
    side?: 'flip' | 'shift' | 'none';
    align?: 'flip' | 'shift' | 'none';
    fallbackAxisSide?: 'start' | 'end' | 'none';
};

/** What a floating part is positioned against, instead of its trigger. */
export type FloatingAnchor =
    | Element
    | VirtualElement
    | React.RefObject<Element | VirtualElement | null>
    | (() => Element | VirtualElement | null)
    | null;

/** Positioning a floating part's Content can ask its Root for. */
export type ContentPositioning = {
    side?: Side;
    align?: Align;
    sideOffset?: number;
    alignOffset?: number;
    /** Element, virtual element (`getBoundingClientRect`), ref or function to position against instead of the trigger. */
    anchor?: FloatingAnchor;
    positionMethod?: PositionMethod;
    collisionAvoidance?: CollisionAvoidance;
    /** Keep the popup in view after its anchor scrolls out of the boundary. */
    sticky?: boolean;
    arrowPadding?: number;
    /** Stop re-positioning when the anchor's layout shifts (scroll and resize still update). */
    disableAnchorTracking?: boolean;
};

/** `side` + `align` as a floating-ui placement (`center` has no suffix). */
export const toPlacement = (side: Side, align: Align = 'center'): Placement =>
    (align === 'center' ? side : `${side}-${align}`) as Placement;

/** The side a resolved placement ended up on (after flipping). */
export const placementSide = (placement?: string): Side | undefined =>
    (placement ? placement.split('-')[0] : undefined) as Side | undefined;

/** The alignment a resolved placement ended up with. */
export const placementAlign = (placement?: string): Align | undefined => {
    if (!placement) return undefined;
    return (placement.split('-')[1] as Align | undefined) ?? 'center';
};

/** Shallow equality, so a Content re-render with the same values doesn't re-position. */
export const samePositioning = (a: ContentPositioning, b: ContentPositioning) => {
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]) as Set<keyof ContentPositioning>;
    for (const key of keys) {
        if (key === 'collisionAvoidance') {
            const x = a.collisionAvoidance ?? {};
            const y = b.collisionAvoidance ?? {};
            if (x.side !== y.side || x.align !== y.align || x.fallbackAxisSide !== y.fallbackAxisSide) return false;
        } else if (a[key] !== b[key]) {
            return false;
        }
    }
    return true;
};

/** Resolves an `anchor` prop to what floating-ui takes as the reference. `undefined` means "use the trigger". */
export const resolveAnchor = (anchor: FloatingAnchor | undefined): Element | VirtualElement | null | undefined => {
    if (anchor === undefined || anchor === null) return undefined;
    if (typeof anchor === 'function') return anchor() ?? undefined;
    if ('current' in anchor) return anchor.current ?? undefined;
    return anchor;
};

type CollisionOptions = {
    avoidCollisions?: boolean;
    collisionAvoidance?: CollisionAvoidance;
    padding?: Padding;
    boundary?: Boundary;
    sticky?: boolean;
    /** Whether the placement has an alignment (start/end), which enables flipping it. */
    aligned?: boolean;
};

/** flip + shift middleware that follow `collisionAvoidance` and `sticky`. */
export const collisionMiddleware = ({
    avoidCollisions = true,
    collisionAvoidance = {},
    padding,
    boundary,
    sticky = false,
    aligned = false
}: CollisionOptions): Middleware[] => {
    if (!avoidCollisions) return [];
    const { side = 'flip', align = 'shift', fallbackAxisSide = 'start' } = collisionAvoidance;
    const overflow = {
        padding,
        ...(boundary && (!Array.isArray(boundary) || boundary.length > 0) ? { boundary, altBoundary: true } : {})
    };
    const out: Middleware[] = [];
    if (side === 'flip' || align === 'flip') {
        out.push(flip({
            ...overflow,
            mainAxis: side === 'flip',
            crossAxis: align === 'flip' ? 'alignment' : false,
            ...(aligned && align === 'flip' ? { flipAlignment: true } : {}),
            fallbackAxisSideDirection: side === 'flip' && fallbackAxisSide !== 'none' ? fallbackAxisSide : 'none'
        }));
    }
    if (align === 'shift' || side === 'shift') {
        out.push(shift({
            ...overflow,
            mainAxis: align === 'shift',
            crossAxis: side === 'shift',
            limiter: sticky ? undefined : limitShift()
        }));
    }
    return out;
};

/** `whileElementsMounted` that honours `disableAnchorTracking`. */
export const anchorTracking = (disableAnchorTracking?: boolean) =>
    (reference: Element | VirtualElement, floating: HTMLElement, update: () => void) =>
        autoUpdate(reference as Element, floating, update, disableAnchorTracking
            ? { elementResize: false, layoutShift: false, animationFrame: false }
            : undefined);
