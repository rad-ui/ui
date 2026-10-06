import {
    DISMISS_DISTANCE_RATIO,
    FAST_FLICK_VELOCITY,
    MAX_RELEASE_DURATION_MS,
    MAX_RELEASE_VELOCITY,
    MAX_SNAP_VELOCITY,
    MIN_RELEASE_DURATION_MS,
    MIN_RELEASE_STRENGTH,
    MIN_RELEASE_VELOCITY,
    MIN_SWIPE_DISTANCE,
    RUBBER_BAND_FACTOR,
    SNAP_VELOCITY_PROJECTION,
    SNAP_VELOCITY_THRESHOLD,
} from '../constants';

export type SwipeAxis = 'x' | 'y';

/** The side a drawer is docked on. Also the direction it is dragged to dismiss. */
export type DrawerSide = 'left' | 'right' | 'top' | 'bottom';

/** Normalised dismissal direction. */
export type DismissDirection = 'up' | 'down' | 'left' | 'right';

export type DrawerSnapPoint = number | string;

export type ResolvedSnapPoint = {
    /** The value exactly as the consumer passed it. */
    value: DrawerSnapPoint;
    /** Height in px the popup is pinned to. */
    height: number;
    /** Distance from the fully expanded position, in px. */
    offset: number;
};

export function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}

/**
 * Normalises the public `swipeDirection` prop to a docked side.
 * `up`/`down` are accepted as aliases for `top`/`bottom`.
 */
export function normalizeDrawerSide(direction: string): DrawerSide {
    switch (direction) {
        case 'up':
            return 'top';
        case 'down':
            return 'bottom';
        default:
            return direction as DrawerSide;
    }
}

export function getAxisForSide(side: DrawerSide): SwipeAxis {
    return side === 'left' || side === 'right' ? 'x' : 'y';
}

export function getDismissDirection(side: DrawerSide): DismissDirection {
    switch (side) {
        case 'top':
            return 'up';
        case 'bottom':
            return 'down';
        default:
            return side;
    }
}

/** The side the drawer slides in *from*, i.e. the opposite of its dock side. */
export function getOppositeSide(side: DrawerSide): DrawerSide {
    switch (side) {
        case 'top':
            return 'bottom';
        case 'bottom':
            return 'top';
        case 'left':
            return 'right';
        default:
            return 'left';
    }
}

/**
 * Signed displacement along a dismissal direction. Positive always means
 * "further toward dismissing the drawer".
 */
export function getDisplacement(direction: DismissDirection, deltaX: number, deltaY: number) {
    switch (direction) {
        case 'up':
            return -deltaY;
        case 'down':
            return deltaY;
        case 'left':
            return -deltaX;
        default:
            return deltaX;
    }
}

export function getDrawerSize(element: HTMLElement, direction: DismissDirection) {
    return direction === 'left' || direction === 'right'
        ? element.offsetWidth
        : element.offsetHeight;
}

/**
 * Distance (px) a slow drag must cover to dismiss: half the drawer, with a
 * small floor so tiny drawers stay dismissible.
 */
export function getDismissThreshold(element: HTMLElement, direction: DismissDirection) {
    return Math.max(getDrawerSize(element, direction) * DISMISS_DISTANCE_RATIO, MIN_SWIPE_DISTANCE);
}

/**
 * Square-root resistance, applied to travel past the fully expanded position so
 * over-drag never tracks the finger pixel-for-pixel.
 */
export function dampOverdrag(value: number) {
    return Math.sign(value) * Math.sqrt(Math.abs(value));
}

/**
 * Rubber-bands a drag back toward the expanded position. Takes the inward
 * distance as a positive number and returns a damped displacement.
 */
export function rubberBand(inwardPx: number) {
    return -inwardPx * RUBBER_BAND_FACTOR;
}

// ── Release strength ─────────────────────────────────────────────────────────

export type ReleaseStrengthInput = {
    element: HTMLElement;
    direction: DismissDirection;
    /** Signed drag displacement along the dismissal direction. */
    displacement: number;
    /** Velocity at release, in px/ms. */
    velocity: number;
    /** Snap point offset the drawer is currently pinned at, px. */
    snapPointOffset?: number;
};

/**
 * Scalar in (0.1, 1] that scales the release transition, so a hard flick snaps
 * shut quickly instead of playing the full close animation. `null` when the
 * release is too slow to be worth scaling.
 */
export function resolveReleaseStrength({
    element,
    direction,
    displacement,
    velocity,
    snapPointOffset = 0,
}: ReleaseStrengthInput): number | null {
    const size = getDrawerSize(element, direction);
    if (size <= 0) return null;

    const remaining = Math.max(0, size - (snapPointOffset + displacement));
    if (remaining <= 0) return null;
    if (velocity <= MIN_RELEASE_VELOCITY) return null;

    const clamped = clamp(velocity, MIN_RELEASE_VELOCITY, MAX_RELEASE_VELOCITY);
    const duration = clamp(remaining / clamped, MIN_RELEASE_DURATION_MS, MAX_RELEASE_DURATION_MS);
    const normalized = (duration - MIN_RELEASE_DURATION_MS) / (MAX_RELEASE_DURATION_MS - MIN_RELEASE_DURATION_MS);

    return MIN_RELEASE_STRENGTH + normalized * (1 - MIN_RELEASE_STRENGTH);
}

// ── Snap points ──────────────────────────────────────────────────────────────

/**
 * Converts a snap point to px.
 *
 * - `number` in (0, 1] → fraction of the viewport
 * - `number` > 1 → raw pixels
 * - `'148px'` → pixels, `'30rem'` → scaled by the root font size
 * - anything else → `null` (the point is dropped)
 */
export function resolveSnapPointPixels(
    snapPoint: DrawerSnapPoint,
    viewportSize: number,
    rootFontSize: number,
): number | null {
    if (!Number.isFinite(viewportSize) || viewportSize <= 0) return null;

    if (typeof snapPoint === 'number') {
        if (!Number.isFinite(snapPoint)) return null;
        if (snapPoint <= 1) return clamp(snapPoint, 0, 1) * viewportSize;
        return snapPoint;
    }

    const trimmed = snapPoint.trim();
    if (trimmed.endsWith('px')) {
        const parsed = Number.parseFloat(trimmed);
        return Number.isFinite(parsed) ? parsed : null;
    }
    if (trimmed.endsWith('rem')) {
        const parsed = Number.parseFloat(trimmed);
        return Number.isFinite(parsed) ? parsed * rootFontSize : null;
    }
    return null;
}

/**
 * Resolves snap points against the measured popup and viewport, and drops
 * duplicates (within 1px) keeping the later declaration.
 */
export function resolveSnapPoints(
    snapPoints: DrawerSnapPoint[],
    viewportSize: number,
    popupHeight: number,
    rootFontSize: number,
): ResolvedSnapPoint[] {
    if (!snapPoints.length || popupHeight <= 0) return [];

    const maxHeight = Math.min(popupHeight, viewportSize || popupHeight);

    const resolved = snapPoints
        .map((value) => {
            const pixels = resolveSnapPointPixels(value, viewportSize, rootFontSize);
            if (pixels === null) return null;
            const height = clamp(pixels, 0, maxHeight);
            return { value, height, offset: Math.max(0, popupHeight - height) };
        })
        .filter((point): point is ResolvedSnapPoint => point !== null);

    if (resolved.length < 2) return resolved;

    const deduped: ResolvedSnapPoint[] = [];
    for (let i = resolved.length - 1; i >= 0; i -= 1) {
        const candidate = resolved[i];
        if (deduped.some((kept) => Math.abs(kept.height - candidate.height) <= 1)) continue;
        deduped.push(candidate);
    }
    return deduped.reverse();
}

export function findClosestSnapPointIndex(snapPoints: ResolvedSnapPoint[], target: number) {
    let closest = -1;
    let closestDistance = Infinity;
    for (let i = 0; i < snapPoints.length; i += 1) {
        const distance = Math.abs(snapPoints[i].offset - target);
        if (distance < closestDistance) {
            closestDistance = distance;
            closest = i;
        }
    }
    return closest;
}

export function findClosestSnapPoint(snapPoints: ResolvedSnapPoint[], target: number) {
    const index = findClosestSnapPointIndex(snapPoints, target);
    return index === -1 ? null : snapPoints[index];
}

export type SnapReleaseDecision =
    | { type: 'close'; snapPoint: ResolvedSnapPoint | null }
    | { type: 'settle'; snapPoint: ResolvedSnapPoint | null }
    | { type: 'stay' };

/**
 * Decides between dismissing and settling on a snap point when a drag is
 * released.
 *
 * `snapToSequentialPoints` disables velocity-based skipping so the target is
 * decided by drag distance alone: you can still drag past several points, but a
 * flick no longer skips ahead.
 */
export function resolveSnapRelease({
    snapPoints,
    currentOffset,
    popupHeight,
    dragDelta,
    directionalVelocity,
    snapToSequentialPoints,
}: {
    snapPoints: ResolvedSnapPoint[];
    currentOffset: number;
    popupHeight: number;
    dragDelta: number;
    directionalVelocity: number;
    snapToSequentialPoints: boolean;
}): SnapReleaseDecision {
    if (!snapPoints.length || popupHeight <= 0) return { type: 'stay' };

    const dragDirection = Math.sign(dragDelta);
    const dragTargetOffset = clamp(currentOffset + dragDelta, 0, popupHeight);

    const velocityOffset =
        Math.abs(directionalVelocity) >= SNAP_VELOCITY_THRESHOLD
            ? clamp(directionalVelocity, -MAX_SNAP_VELOCITY, MAX_SNAP_VELOCITY) *
              SNAP_VELOCITY_PROJECTION
            : 0;

    const targetOffset = snapToSequentialPoints
        ? dragTargetOffset
        : clamp(dragTargetOffset + velocityOffset, 0, popupHeight);

    const ordered = [...snapPoints].sort((a, b) => a.offset - b.offset);

    let targetSnapPoint = findClosestSnapPoint(ordered, targetOffset);
    let effectiveTargetOffset = targetOffset;

    if (snapToSequentialPoints) {
        const currentIndex = findClosestSnapPointIndex(ordered, currentOffset);
        const advancing =
            dragDirection !== 0 &&
            Math.sign(directionalVelocity) === dragDirection &&
            Math.abs(directionalVelocity) >= SNAP_VELOCITY_THRESHOLD;

        if (advancing) {
            const adjacentIndex = clamp(currentIndex + dragDirection, 0, ordered.length - 1);
            if (adjacentIndex !== currentIndex) {
                const adjacent = ordered[adjacentIndex];
                // A flick that would otherwise undershoot still advances one step.
                const undershoots = dragDirection > 0
                    ? targetOffset < adjacent.offset
                    : targetOffset > adjacent.offset;
                if (undershoots) {
                    targetSnapPoint = adjacent;
                    effectiveTargetOffset = adjacent.offset;
                }
            } else if (dragDirection > 0) {
                // Already at the most collapsed point, so a further flick closes.
                return { type: 'close', snapPoint: targetSnapPoint };
            }
        }
    } else if (directionalVelocity >= FAST_FLICK_VELOCITY && dragDelta > 0) {
        // A fast flick toward dismissal always closes, however far it travelled.
        return { type: 'close', snapPoint: targetSnapPoint };
    }

    // "Fully closed" is modelled as the maximum offset.
    const closeDistance = Math.abs(effectiveTargetOffset - popupHeight);
    const snapDistance = targetSnapPoint ? Math.abs(effectiveTargetOffset - targetSnapPoint.offset) : Infinity;

    if (closeDistance < snapDistance) return { type: 'close', snapPoint: targetSnapPoint };
    return { type: 'settle', snapPoint: targetSnapPoint };
}

/**
 * Movement to write to the swipe variable so the resulting total offset lands on
 * `-sqrt(-total)` once the drawer is dragged past fully expanded.
 */
export function getSnapPointSwipeMovement(baseOffset: number, movement: number) {
    const nextOffset = baseOffset + movement;
    if (nextOffset >= 0) return movement;
    return -Math.sqrt(-nextOffset) - baseOffset;
}
