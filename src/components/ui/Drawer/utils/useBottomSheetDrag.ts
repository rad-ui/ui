'use client';

import * as React from 'react';

/**
 * Drawer drag is now direction-aware for all four sheet edges.
 *
 * Why it still lives in one utility:
 * - Every drawer uses the same high-level interaction contract: drag from the
 *   exposed handle edge, dismiss when movement/velocity crosses a threshold,
 *   otherwise snap back with resistance.
 * - The differences between edges are mostly axis selection and sign handling,
 *   so keeping that mapping in one place is easier to reason about than
 *   duplicating four near-identical hooks.
 * - The utility still stays drawer-specific; we are not moving any gesture
 *   behavior into the shared dialog primitive.
 */
const SHEET_DIRECTIONS = ['down', 'up', 'left', 'right'] as const;
type SheetDirection = typeof SHEET_DIRECTIONS[number];

/**
 * Only the top portion of the sheet should initiate a dismiss drag.
 *
 * Why this exists:
 * - It avoids fighting with normal content scrolling in the sheet body.
 * - It behaves more like a sheet handle / header drag zone.
 * - It keeps the first-pass implementation predictable while we do not yet
 *   have a dedicated `Drawer.Handle` subcomponent.
 */
const DRAG_ACTIVATION_ZONE_PX = 56;

/**
 * Absolute minimum travel before we dismiss, even if the user flings quickly.
 * This prevents accidental close actions from tiny, noisy pointer movements.
 */
const MIN_DISMISS_DISTANCE_PX = 24;

/**
 * Distance threshold relative to sheet height.
 *
 * A 35% threshold feels deliberate for a dismiss gesture while still allowing
 * the user to complete the action without dragging the sheet all the way off
 * screen.
 */
const DISMISS_PROGRESS_THRESHOLD = 0.35;

/**
 * Velocity threshold in px/ms for a fling-style dismiss.
 *
 * This works together with the minimum distance threshold so a very short,
 * accidental flick does not close the sheet.
 */
const DISMISS_VELOCITY_THRESHOLD = 0.6;

/**
 * Interactive controls inside the header should continue to behave like normal
 * controls. For example, tapping `Drawer.Close` must click the button rather
 * than turning into a drag gesture.
 */
const INTERACTIVE_SELECTOR = [
    'button',
    'a[href]',
    'input',
    'select',
    'textarea',
    '[role="button"]',
    '[role="link"]',
    '[contenteditable="true"]'
].join(',');

type DragSample = {
    position: number;
    timestamp: number;
};

export type UseBottomSheetDragOptions = {
    direction: string;
    enabled: boolean;
    isOpen: boolean;
    onDismiss: () => void;
};

export type UseBottomSheetDragResult = {
    dragStyle: React.CSSProperties;
    dragStateAttributes: Record<string, string | undefined>;
    dragEventHandlers: {
        onPointerDown: React.PointerEventHandler<HTMLDivElement>;
        onPointerMove: React.PointerEventHandler<HTMLDivElement>;
        onPointerUp: React.PointerEventHandler<HTMLDivElement>;
        onPointerCancel: React.PointerEventHandler<HTMLDivElement>;
    };
};

type DragState = {
    offset: number;
    stretch: number;
};

type SettleMode = 'offset' | 'stretch' | null;

const STRETCH_SETTLE_DURATION_MS = 420;
const DISMISS_SETTLE_DURATION_MS = 240;
const SWIPE_DISMISS_CLICK_SUPPRESSION_MS = 360;

let lastSwipeDismissAt = 0;

/**
 * Clamp progress to the range that styling contracts expect.
 */
function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}

function getNow() {
    return typeof performance !== 'undefined' ? performance.now() : Date.now();
}

export function markRecentSwipeDismiss() {
    lastSwipeDismissAt = getNow();
}

export function shouldIgnoreDismissFollowUpClick() {
    return getNow() - lastSwipeDismissAt <= SWIPE_DISMISS_CLICK_SUPPRESSION_MS;
}

/**
 * Converts "overshoot" distance into a resisted stretch amount.
 *
 * Why the math is nonlinear:
 * - A 1:1 mapping feels broken because the sheet grows too aggressively.
 * - A resisted curve preserves the feeling that the cursor is still connected
 *   to the sheet while clearly communicating "you are pulling past the natural
 *   limit".
 *
 * The exact curve is intentionally simple and readable for this first pass:
 * `distance * factor / (1 + distance / limit)`.
 *
 * That gives us:
 * - responsive movement at short distances
 * - visible resistance as the drag grows
 * - a hard upper bound so the sheet never balloons infinitely
 */
function applyStretchResistance(distance: number, limit: number) {
    const factor = 0.65;
    const resisted = (distance * factor) / (1 + distance / limit);

    return clamp(resisted, 0, limit);
}

/**
 * Returns `true` when the event target is a control that should keep its own
 * default behavior instead of becoming the start of a drag gesture.
 */
function isInteractiveTarget(target: EventTarget | null) {
    return target instanceof Element && Boolean(target.closest(INTERACTIVE_SELECTOR));
}

/**
 * A dismiss drag should only start near the exposed sheet edge that owns the
 * handle, so the visible affordance and interactive region stay aligned.
 */
function isInsideActivationZone(
    element: HTMLElement,
    pointer: { clientX: number; clientY: number },
    direction: SheetDirection
) {
    const rect = element.getBoundingClientRect();
    if (direction === 'down') {
        return pointer.clientY <= rect.top + DRAG_ACTIVATION_ZONE_PX;
    }

    if (direction === 'up') {
        return pointer.clientY >= rect.bottom - DRAG_ACTIVATION_ZONE_PX;
    }

    if (direction === 'left') {
        return pointer.clientX >= rect.right - DRAG_ACTIVATION_ZONE_PX;
    }

    return pointer.clientX <= rect.left + DRAG_ACTIVATION_ZONE_PX;
}

function getPointerPosition(
    pointer: { clientX: number; clientY: number },
    direction: SheetDirection
) {
    return direction === 'left' || direction === 'right'
        ? pointer.clientX
        : pointer.clientY;
}

function getDirectionalDelta(delta: number, direction: SheetDirection) {
    if (direction === 'down' || direction === 'right') {
        return delta;
    }

    return delta * -1;
}

function getSheetSize(element: HTMLElement, direction: SheetDirection) {
    const rect = element.getBoundingClientRect();
    return direction === 'left' || direction === 'right'
        ? rect.width || 0
        : rect.height || 0;
}

/**
 * Velocity is computed from the most recent movement sample rather than the
 * whole gesture. That makes fling dismissal feel responsive even when the
 * user starts slowly and finishes quickly.
 */
function getVelocity(current: DragSample, previous: DragSample) {
    const deltaTime = current.timestamp - previous.timestamp;

    if (deltaTime <= 0) {
        return 0;
    }

    return (current.position - previous.position) / deltaTime;
}

/**
 * The dismiss heuristic combines two signals:
 * - distance travelled as a percentage of the sheet size on its active axis
 * - instantaneous fling velocity near the end of the gesture
 *
 * This mirrors how mobile sheets usually behave: either drag the sheet far
 * enough, or fling it decisively toward its dismiss edge.
 */
function shouldDismissSheet({
    distance,
    size,
    velocity
}: {
    distance: number;
    size: number;
    velocity: number;
}) {
    const progress = size > 0 ? distance / size : 0;

    if (distance >= MIN_DISMISS_DISTANCE_PX && velocity >= DISMISS_VELOCITY_THRESHOLD) {
        return true;
    }

    return progress >= DISMISS_PROGRESS_THRESHOLD;
}

/**
 * Provides the minimum behavior needed for a Vaul-style edge drag:
 * - pointer-driven offset on the active axis
 * - edge-only gesture activation
 * - release heuristics for settle vs dismiss
 * - styling hooks via CSS custom properties and `data-*` attributes
 *
 * We keep the hook self-contained so the drawer wrapper can adopt richer
 * gesture models later without baking incomplete assumptions into the shared
 * dialog primitive.
 */
export function useBottomSheetDrag({
    direction,
    enabled,
    isOpen,
    onDismiss
}: UseBottomSheetDragOptions): UseBottomSheetDragResult {
    const sheetDirection = SHEET_DIRECTIONS.includes(direction as SheetDirection)
        ? direction as SheetDirection
        : 'down';
    const [dragState, setDragState] = React.useState<DragState>({ offset: 0, stretch: 0 });
    const [isDragging, setIsDragging] = React.useState(false);
    const [settleMode, setSettleMode] = React.useState<SettleMode>(null);

    const elementRef = React.useRef<HTMLDivElement | null>(null);
    const pointerIdRef = React.useRef<number | null>(null);
    const startPositionRef = React.useRef(0);
    const latestSampleRef = React.useRef<DragSample | null>(null);
    const previousSampleRef = React.useRef<DragSample | null>(null);
    const settleTimeoutRef = React.useRef<number | null>(null);
    const dismissResetTimeoutRef = React.useRef<number | null>(null);
    const dismissingRef = React.useRef(false);

    const clearSettleTimeout = React.useCallback(() => {
        if (settleTimeoutRef.current !== null) {
            window.clearTimeout(settleTimeoutRef.current);
            settleTimeoutRef.current = null;
        }
    }, []);

    const clearDismissResetTimeout = React.useCallback(() => {
        if (dismissResetTimeoutRef.current !== null) {
            window.clearTimeout(dismissResetTimeoutRef.current);
            dismissResetTimeoutRef.current = null;
        }
    }, []);

    const scheduleSettleReset = React.useCallback((mode: SettleMode) => {
        clearSettleTimeout();
        setSettleMode(mode);

        if (!mode) {
            return;
        }

        settleTimeoutRef.current = window.setTimeout(() => {
            setSettleMode(null);
            settleTimeoutRef.current = null;
        }, STRETCH_SETTLE_DURATION_MS);
    }, [clearSettleTimeout]);

    const resetDrag = React.useCallback((nextState: DragState = { offset: 0, stretch: 0 }) => {
        pointerIdRef.current = null;
        setIsDragging(false);
        setDragState(nextState);
    }, []);

    React.useEffect(() => {
        return () => {
            clearSettleTimeout();
            clearDismissResetTimeout();
        };
    }, [clearDismissResetTimeout, clearSettleTimeout]);

    React.useEffect(() => {
        if (isOpen) {
            dismissingRef.current = false;
            clearDismissResetTimeout();
            setDragState({ offset: 0, stretch: 0 });
            setSettleMode(null);
            return;
        }

        if (dismissingRef.current) {
            setIsDragging(false);
            setSettleMode('offset');
            clearDismissResetTimeout();
            dismissResetTimeoutRef.current = window.setTimeout(() => {
                dismissingRef.current = false;
                dismissResetTimeoutRef.current = null;
                setDragState({ offset: 0, stretch: 0 });
                setSettleMode(null);
            }, DISMISS_SETTLE_DURATION_MS);
            return;
        }

        requestAnimationFrame(() => {
            setDragState({ offset: 0, stretch: 0 });
            setIsDragging(false);
            setSettleMode(null);
        });
    }, [clearDismissResetTimeout, isOpen]);

    const handlePointerDown = React.useCallback<React.PointerEventHandler<HTMLDivElement>>((event) => {
        if (!enabled || !isOpen) {
            return;
        }

        if (event.pointerType === 'mouse' && event.button !== 0) {
            return;
        }

        if (isInteractiveTarget(event.target)) {
            return;
        }

        if (!isInsideActivationZone(event.currentTarget, event, sheetDirection)) {
            return;
        }

        elementRef.current = event.currentTarget;
        pointerIdRef.current = event.pointerId;
        startPositionRef.current = getPointerPosition(event, sheetDirection);

        const sample = {
            position: getPointerPosition(event, sheetDirection),
            timestamp: performance.now()
        };

        previousSampleRef.current = sample;
        latestSampleRef.current = sample;

        if (typeof event.currentTarget.setPointerCapture === 'function') {
            event.currentTarget.setPointerCapture(event.pointerId);
        }
    }, [enabled, isOpen, sheetDirection]);

    const handlePointerMove = React.useCallback<React.PointerEventHandler<HTMLDivElement>>((event) => {
        if (pointerIdRef.current !== event.pointerId) {
            return;
        }

        const delta = getPointerPosition(event, sheetDirection) - startPositionRef.current;
        const directionalDelta = getDirectionalDelta(delta, sheetDirection);
        const element = elementRef.current ?? event.currentTarget;
        const size = getSheetSize(element, sheetDirection);
        const stretchLimit = Math.max(48, size * 0.18);

        event.preventDefault();
        setIsDragging(true);
        setSettleMode(null);

        if (directionalDelta >= 0) {
            setDragState({
                offset: directionalDelta,
                stretch: 0
            });
        } else {
            setDragState({
                offset: 0,
                stretch: applyStretchResistance(Math.abs(directionalDelta), stretchLimit)
            });
        }

        previousSampleRef.current = latestSampleRef.current;
        latestSampleRef.current = {
            position: getPointerPosition(event, sheetDirection),
            timestamp: performance.now()
        };
    }, [sheetDirection]);

    const finishGesture = React.useCallback((event: React.PointerEvent<HTMLDivElement>, cancelled: boolean) => {
        if (pointerIdRef.current !== event.pointerId) {
            return;
        }

        const element = elementRef.current ?? event.currentTarget;

        if (typeof element.releasePointerCapture === 'function' && element.hasPointerCapture?.(event.pointerId)) {
            element.releasePointerCapture(event.pointerId);
        }

        if (cancelled || !isDragging) {
            resetDrag();
            scheduleSettleReset(null);
            return;
        }

        const latestSample = latestSampleRef.current;
        const previousSample = previousSampleRef.current;
        const rawVelocity = latestSample && previousSample
            ? getVelocity(latestSample, previousSample)
            : 0;
        const velocity = getDirectionalDelta(rawVelocity, sheetDirection);

        const size = getSheetSize(element, sheetDirection);
        const shouldDismiss = shouldDismissSheet({
            distance: dragState.offset,
            size,
            velocity
        });

        if (shouldDismiss) {
            markRecentSwipeDismiss();
            dismissingRef.current = true;
            resetDrag({ offset: dragState.offset, stretch: 0 });
            scheduleSettleReset('offset');
            onDismiss();
            return;
        }

        resetDrag();
        scheduleSettleReset(dragState.stretch > 0 ? 'stretch' : 'offset');
    }, [dragState.offset, dragState.stretch, isDragging, onDismiss, resetDrag, scheduleSettleReset, sheetDirection]);

    const dragProgress = clamp(dragState.offset / 320, 0, 1);
    const stretchScale = clamp(dragState.stretch / 320, 0, 0.18);

    return {
        dragStyle: {
            '--rad-ui-drawer-drag-offset': `${dragState.offset}px`,
            '--rad-ui-drawer-drag-progress': `${dragProgress}`,
            '--rad-ui-drawer-drag-stretch': `${dragState.stretch}px`,
            '--rad-ui-drawer-drag-stretch-scale': `${stretchScale}`
        } as React.CSSProperties,
        dragStateAttributes: {
            'data-dragging': isDragging ? 'true' : undefined,
            'data-drag-stretching': dragState.stretch > 0 ? 'true' : undefined,
            'data-drag-settling': settleMode ?? undefined
        },
        dragEventHandlers: {
            onPointerDown: handlePointerDown,
            onPointerMove: handlePointerMove,
            onPointerUp: (event) => finishGesture(event, false),
            onPointerCancel: (event) => finishGesture(event, true)
        }
    };
}

export function isBottomSheetDirection(direction: string) {
    return SHEET_DIRECTIONS.includes(direction as SheetDirection);
}

export default useBottomSheetDrag;
