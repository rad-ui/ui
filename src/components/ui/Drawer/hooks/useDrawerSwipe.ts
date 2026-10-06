'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    AXIS_LOCK_SLOP,
    CSS_VAR,
    FAST_FLICK_VELOCITY,
    MAX_RELEASE_VELOCITY_AGE_MS,
    MIN_VELOCITY_SAMPLE_MS,
    SWIPE_IGNORE_SELECTOR,
} from '../constants';
import {
    DismissDirection,
    ResolvedSnapPoint,
    clamp,
    dampOverdrag,
    getDismissThreshold,
    getDisplacement,
    getDrawerSize,
    getSnapPointSwipeMovement,
    resolveReleaseStrength,
    resolveSnapRelease,
    rubberBand,
} from '../utils/drawerMath';

type Axis = 'x' | 'y';

type Point = { x: number; y: number };

type GestureState = {
    start: Point;
    startDisplacement: number;
    startTime: number;
    axis: Axis | null;
    /** Set once the gesture has been attributed to the drawer. */
    dragging: boolean;
};

export type UseDrawerSwipeOptions = {
    /** The element that moves during a drag. */
    elementRef: React.RefObject<HTMLElement | null>;
    /** Direction in which the drawer is dismissed. */
    dismissDirection: DismissDirection;
    /** Axis the dismissal happens on. */
    axis: Axis;
    /** Whether the drawer is open and swipe handling should be active. */
    enabled: boolean;
    /** True when a child drawer is open, which blocks swipe on the parent. */
    disabledByNestedDrawer?: boolean;
    snapPoints?: ResolvedSnapPoint[];
    popupHeight?: number;
    activeSnapPointOffset?: number;
    snapToSequentialPoints?: boolean;
    /** Requests that the drawer close. */
    onDismiss: () => void;
    /** Requests a snap point change as a drag settles. */
    onSettle?: (snapPoint: ResolvedSnapPoint | null) => void;
    onSwipingChange?: (swiping: boolean) => void;
    /** Reports drag progress, 0 = most collapsed, 1 = fully expanded. */
    onProgress?: (progress: number) => void;
};

export type DrawerSwipeResult = {
    /** True while a drag is in progress. Drives `data-swiping`. */
    swiping: boolean;
    /** True while a drag is settling back onto a snap point. */
    isSnapping: boolean;
    /** Props for pointer input (mouse and pen). */
    pointerProps: { onPointerDown: (event: React.PointerEvent<HTMLElement>) => void };
    /**
     * Props for touch input. Touch needs its own path because the browser owns
     * vertical panning by default, so the drawer has to claim the gesture with
     * `preventDefault` rather than wait for pointer events the browser cancels.
     */
    touchProps: {
        onTouchStart: React.TouchEventHandler<HTMLElement>;
        onTouchMove: React.TouchEventHandler<HTMLElement>;
        onTouchEnd: React.TouchEventHandler<HTMLElement>;
        onTouchCancel: React.TouchEventHandler<HTMLElement>;
    };
};

/** Elements that own their interaction and must never start a drag. */
const INTERACTIVE_SELECTOR =
    'button,a,input,select,textarea,label,summary,[role="button"],[role="slider"],[contenteditable="true"],[data-no-drag]';

/** Safety net for the settle transition, in case `transitionend` never fires. */
const SNAP_BACK_FALLBACK_MS = 400;

function isHorizontal(direction: DismissDirection) {
    return direction === 'left' || direction === 'right';
}

/** Prefers the event timestamp, which reflects when the input actually happened. */
function eventTime(event: { timeStamp: number }) {
    return event.timeStamp > 0 ? event.timeStamp : performance.now();
}

/**
 * Finds the nearest scrollable ancestor of `node`, stopping at `boundary`.
 */
function findScrollableAncestor(node: Element | null, boundary: HTMLElement) {
    let current = node as HTMLElement | null;

    while (current && current !== boundary) {
        const style = window.getComputedStyle(current);
        const canScrollY =
            (style.overflowY === 'auto' || style.overflowY === 'scroll') &&
            current.scrollHeight > current.clientHeight;
        const canScrollX =
            (style.overflowX === 'auto' || style.overflowX === 'scroll') &&
            current.scrollWidth > current.clientWidth;

        if (canScrollY || canScrollX) return { element: current, axis: (canScrollY ? 'y' : 'x') as Axis };
        current = current.parentElement;
    }

    return null;
}

/**
 * True when a scroll container already sits at the edge a dismissal drag starts
 * from, which is the only position where the drawer may take over a scroll.
 */
function isAtDismissStartEdge(element: HTMLElement, axis: Axis, direction: DismissDirection) {
    if (axis === 'y') {
        return direction === 'down'
            ? element.scrollTop <= 0
            : element.scrollTop >= element.scrollHeight - element.clientHeight;
    }
    return direction === 'right'
        ? element.scrollLeft <= 0
        : element.scrollLeft >= element.scrollWidth - element.clientWidth;
}

/**
 * Registers the high-frequency drag custom properties as non-inheriting so drag
 * updates do not invalidate style for every descendant. Guarded so SSR and
 * browsers without `registerProperty` simply skip the optimisation.
 */
let cssVarsRegistered = false;
function registerSwipeCssVars() {
    if (cssVarsRegistered) return;
    cssVarsRegistered = true;

    if (typeof CSS === 'undefined' || typeof CSS.registerProperty !== 'function') return;

    [
        { name: CSS_VAR.movementX, syntax: '<length>', initialValue: '0px' },
        { name: CSS_VAR.movementY, syntax: '<length>', initialValue: '0px' },
        { name: CSS_VAR.snapPointOffset, syntax: '<length>', initialValue: '0px' },
        { name: CSS_VAR.progress, syntax: '<number>', initialValue: '1' },
        { name: CSS_VAR.strength, syntax: '<number>', initialValue: '1' },
    ].forEach((definition) => {
        try {
            CSS.registerProperty({ ...definition, inherits: false });
        } catch {
            /* already registered by another instance */
        }
    });
}

/**
 * Swipe-to-dismiss for a drawer.
 *
 * Adds velocity tracking, so a fast flick dismisses without travelling the full
 * distance, and integrates snap points so a drag settles onto the nearest one.
 * Both a distance threshold and a velocity threshold are used, matching how
 * native sheets behave.
 */
export function useDrawerSwipe(options: UseDrawerSwipeOptions): DrawerSwipeResult {
    const {
        elementRef,
        dismissDirection,
        axis,
        enabled,
        disabledByNestedDrawer = false,
        snapPoints,
        popupHeight = 0,
        activeSnapPointOffset = 0,
        snapToSequentialPoints = false,
        onDismiss,
        onSettle,
        onSwipingChange,
        onProgress,
    } = options;

    const [swiping, setSwiping] = useState(false);
    const [isSnapping, setIsSnapping] = useState(false);

    const gestureRef = useRef<GestureState | null>(null);
    const offsetRef = useRef(0);
    const lastSampleRef = useRef<(Point & { time: number }) | null>(null);
    /** `null` = undecided, `true` = drawer owns the gesture, `false` = native scroll. */
    const claimedRef = useRef<boolean | null>(null);
    const snapBackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const progressRangeRef = useRef<{ min: number; range: number } | null>(null);

    // Callbacks live in a ref so gesture handlers never observe a stale closure.
    const callbacksRef = useRef({ onDismiss, onSettle, onSwipingChange, onProgress });
    callbacksRef.current = { onDismiss, onSettle, onSwipingChange, onProgress };

    const active = enabled && !disabledByNestedDrawer;
    const useSnapPoints = Boolean(snapPoints?.length) && !isHorizontal(dismissDirection);

    // ── Progress range ──────────────────────────────────────────────────────
    // With snap points, progress is measured across the spread between the two
    // closest offsets rather than across the whole drawer, so the backdrop stays
    // lit while the drawer rests at a snap point.
    useEffect(() => {
        if (!snapPoints || snapPoints.length < 2) {
            progressRangeRef.current = null;
            return;
        }
        const offsets = snapPoints.map((point) => point.offset).sort((a, b) => a - b);
        const range = offsets[1] - offsets[0];
        progressRangeRef.current = range > 0 ? { min: offsets[0], range } : null;
    }, [snapPoints]);

    // ── Style writing ───────────────────────────────────────────────────────

    const setSwipingState = useCallback((value: boolean) => {
        setSwiping(value);
        callbacksRef.current.onSwipingChange?.(value);
    }, []);

    const writeMovement = useCallback((displacement: number) => {
        const element = elementRef.current;
        if (!element) return;

        if (useSnapPoints) {
            // The snap offset lives in its own variable, so the movement only
            // has to describe the live delta.
            element.style.setProperty(CSS_VAR.movementY, `${getSnapPointSwipeMovement(activeSnapPointOffset, displacement)}px`);
            return;
        }
        if (axis === 'x') {
            element.style.setProperty(CSS_VAR.movementX, `${displacement}px`);
        } else {
            element.style.setProperty(CSS_VAR.movementY, `${displacement}px`);
        }
    }, [activeSnapPointOffset, axis, elementRef, useSnapPoints]);

    const writeProgress = useCallback((displacement: number) => {
        const element = elementRef.current;
        if (!element) return;

        const range = progressRangeRef.current;
        let progress: number;

        if (range) {
            const base = activeSnapPointOffset || range.min;
            const limit = popupHeight || activeSnapPointOffset + range.range;
            const offset = clamp(base + displacement, 0, limit);
            progress = clamp((offset - range.min) / range.range, 0, 1);
        } else {
            const size = getDrawerSize(element, dismissDirection);
            progress = size > 0 ? clamp(1 - Math.max(0, displacement) / size, 0, 1) : 1;
        }

        element.style.setProperty(CSS_VAR.progress, String(progress));
        callbacksRef.current.onProgress?.(progress);
    }, [activeSnapPointOffset, dismissDirection, elementRef, popupHeight]);

    const clearDragStyles = useCallback(() => {
        const element = elementRef.current;
        if (!element) return;
        element.style.removeProperty(CSS_VAR.movementX);
        element.style.removeProperty(CSS_VAR.movementY);
        element.style.removeProperty(CSS_VAR.strength);
        element.style.setProperty(CSS_VAR.progress, '1');
    }, [elementRef]);

    // ── Velocity ────────────────────────────────────────────────────────────

    const recordSample = useCallback((x: number, y: number, time: number) => {
        const previous = lastSampleRef.current;
        lastSampleRef.current = { x, y, time };
        if (!previous) return 0;

        const duration = Math.max(time - previous.time, MIN_VELOCITY_SAMPLE_MS);
        return getDisplacement(dismissDirection, (x - previous.x) / duration, (y - previous.y) / duration);
    }, [dismissDirection]);

    // ── Settle back to rest ─────────────────────────────────────────────────

    const snapBack = useCallback(() => {
        const element = elementRef.current;
        offsetRef.current = 0;
        setSwipingState(false);

        if (!element) {
            setIsSnapping(false);
            return;
        }

        if (snapBackTimerRef.current) clearTimeout(snapBackTimerRef.current);

        setIsSnapping(true);
        clearDragStyles();
        callbacksRef.current.onProgress?.(1);

        const finish = () => {
            element.removeEventListener('transitionend', finish);
            setIsSnapping(false);
        };
        element.addEventListener('transitionend', finish);
        snapBackTimerRef.current = setTimeout(finish, SNAP_BACK_FALLBACK_MS);
    }, [clearDragStyles, elementRef, setSwipingState]);

    /**
     * Hands the release off to the close transition, scaling its duration by how
     * far the drawer still has to travel relative to the release velocity.
     */
    const applyRelease = useCallback((velocity: number, displacement: number) => {
        const element = elementRef.current;
        setSwipingState(false);
        if (!element) return;

        const strength = resolveReleaseStrength({
            element,
            direction: dismissDirection,
            displacement,
            velocity,
            snapPointOffset: useSnapPoints ? activeSnapPointOffset : 0,
        });

        if (strength !== null) element.style.setProperty(CSS_VAR.strength, String(strength));
    }, [activeSnapPointOffset, dismissDirection, elementRef, setSwipingState, useSnapPoints]);

    // ── Gesture lifecycle ───────────────────────────────────────────────────

    const startGesture = useCallback((point: Point, time: number) => {
        gestureRef.current = {
            start: point,
            startDisplacement: offsetRef.current,
            startTime: time,
            axis: null,
            dragging: false,
        };
        offsetRef.current = 0;
        lastSampleRef.current = { ...point, time };
        setSwipingState(true);
    }, [setSwipingState]);

    const applyDisplacement = useCallback((deltaX: number, deltaY: number) => {
        const raw = getDisplacement(dismissDirection, deltaX, deltaY);
        const base = useSnapPoints ? activeSnapPointOffset : 0;
        const next = base + raw;

        let displacement: number;
        if (next < 0) {
            // Dragged past the fully expanded position: square-root resistance.
            displacement = dampOverdrag(next);
        } else if (raw < 0) {
            // Dragged back toward expanded: light rubber band.
            displacement = rubberBand(-raw);
        } else {
            displacement = raw;
        }

        offsetRef.current = displacement;
        writeMovement(displacement);
        writeProgress(displacement);
    }, [activeSnapPointOffset, dismissDirection, useSnapPoints, writeMovement, writeProgress]);

    const finishGesture = useCallback((point: Point, time: number) => {
        const gesture = gestureRef.current;
        gestureRef.current = null;
        claimedRef.current = null;

        if (!gesture) {
            setSwipingState(false);
            return;
        }

        if (!gesture.dragging) {
            offsetRef.current = 0;
            setSwipingState(false);
            return;
        }

        const displacement = offsetRef.current;
        offsetRef.current = 0;

        // Whole-gesture average velocity, over a floor of 50ms.
        const deltaX = point.x - gesture.start.x;
        const deltaY = point.y - gesture.start.y;
        const dragDelta = getDisplacement(dismissDirection, deltaX, deltaY);
        const elapsed = time - gesture.startTime;
        const averageVelocity = elapsed > 0
            ? getDisplacement(dismissDirection, deltaX / Math.max(elapsed, 50), deltaY / Math.max(elapsed, 50))
            : 0;

        // Release velocity from the most recent sample, discarded when the finger
        // paused before lifting so a slow deliberate release never flicks.
        let releaseVelocity = 0;
        const sample = lastSampleRef.current;
        if (sample) {
            const age = time - sample.time;
            if (age <= MAX_RELEASE_VELOCITY_AGE_MS) {
                const window = Math.max(age, MIN_VELOCITY_SAMPLE_MS);
                releaseVelocity = getDisplacement(
                    dismissDirection,
                    (point.x - sample.x) / window,
                    (point.y - sample.y) / window,
                );
            }
        }

        const velocity = releaseVelocity !== 0 ? releaseVelocity : averageVelocity;

        // Snap points, when configured, own the release decision.
        if (snapPoints?.length) {
            const decision = resolveSnapRelease({
                snapPoints,
                currentOffset: activeSnapPointOffset,
                popupHeight,
                dragDelta,
                directionalVelocity: velocity,
                snapToSequentialPoints,
            });

            if (decision.type === 'close') {
                callbacksRef.current.onSettle?.(decision.snapPoint);
                applyRelease(velocity, displacement);
                callbacksRef.current.onDismiss();
                return;
            }
            if (decision.type === 'settle') {
                callbacksRef.current.onSettle?.(decision.snapPoint);
                snapBack();
                return;
            }
        }

        const element = elementRef.current;
        const threshold = element ? getDismissThreshold(element, dismissDirection) : 0;
        const flicked = releaseVelocity > 0 && releaseVelocity >= FAST_FLICK_VELOCITY;
        const draggedFarEnough = dragDelta >= threshold;

        if (flicked || draggedFarEnough) {
            applyRelease(velocity, displacement);
            callbacksRef.current.onDismiss();
        } else {
            snapBack();
        }
    }, [activeSnapPointOffset, applyRelease, dismissDirection, elementRef, popupHeight, snapBack, snapPoints, snapToSequentialPoints, setSwipingState]);

    // ── Pointer path (mouse and pen) ────────────────────────────────────────

    const onPointerDown = useCallback((event: React.PointerEvent<HTMLElement>) => {
        if (!active || event.button !== 0) return;
        // Touch has its own path; ignore it here so a gesture is never handled twice.
        if (event.pointerType === 'touch') return;

        const target = event.target as Element | null;
        if (target?.closest?.(SWIPE_IGNORE_SELECTOR)) return;
        if (target?.closest?.(INTERACTIVE_SELECTOR)) return;

        const element = elementRef.current;
        if (!element) return;

        const scrollable = findScrollableAncestor(target, element);
        if (scrollable && !isAtDismissStartEdge(scrollable.element, scrollable.axis, dismissDirection)) return;

        event.currentTarget.setPointerCapture?.(event.pointerId);
        claimedRef.current = true;
        startGesture({ x: event.clientX, y: event.clientY }, eventTime(event));
    }, [active, dismissDirection, elementRef, startGesture]);

    useEffect(() => {
        const element = elementRef.current;
        if (!element || !active) return;

        registerSwipeCssVars();

        let pointerId: number | null = null;

        const onMove = (event: PointerEvent) => {
            const gesture = gestureRef.current;
            if (!gesture || (pointerId !== null && event.pointerId !== pointerId)) return;
            if (event.pointerType === 'touch') return;
            if (pointerId === null) pointerId = event.pointerId;

            const deltaX = event.clientX - gesture.start.x;
            const deltaY = event.clientY - gesture.start.y;
            const along = axis === 'x' ? Math.abs(deltaX) : Math.abs(deltaY);
            const across = axis === 'x' ? Math.abs(deltaY) : Math.abs(deltaX);

            if (gesture.axis === null) {
                if (along < AXIS_LOCK_SLOP) return;
                // Only claim the gesture when the drag axis clearly dominates, so
                // diagonal drags and content scrolling still work.
                if (across > along) {
                    gestureRef.current = null;
                    claimedRef.current = null;
                    setSwipingState(false);
                    return;
                }
                gesture.axis = axis;
            }

            gesture.dragging = true;
            recordSample(event.clientX, event.clientY, eventTime(event));
            applyDisplacement(deltaX, deltaY);
        };

        const onUp = (event: PointerEvent) => {
            if (pointerId !== null && event.pointerId !== pointerId) return;
            pointerId = null;
            finishGesture({ x: event.clientX, y: event.clientY }, eventTime(event));
        };

        const onCancel = () => {
            pointerId = null;
            gestureRef.current = null;
            offsetRef.current = 0;
            snapBack();
        };

        element.addEventListener('pointermove', onMove);
        element.addEventListener('pointerup', onUp);
        element.addEventListener('pointercancel', onCancel);

        return () => {
            element.removeEventListener('pointermove', onMove);
            element.removeEventListener('pointerup', onUp);
            element.removeEventListener('pointercancel', onCancel);
        };
    }, [active, applyDisplacement, axis, elementRef, finishGesture, recordSample, setSwipingState, snapBack]);

    // ── Touch path ──────────────────────────────────────────────────────────

    const onTouchStart = useCallback((event: React.TouchEvent<HTMLElement>) => {
        const touch = event.touches[0];
        if (!active || !touch) {
            claimedRef.current = false;
            return;
        }

        const target = event.target as Element | null;
        if (target?.closest?.(SWIPE_IGNORE_SELECTOR)) {
            claimedRef.current = false;
            return;
        }

        const element = elementRef.current;
        if (!element) {
            claimedRef.current = false;
            return;
        }

        const scrollable = findScrollableAncestor(target, element);
        // `null` means undecided: the drawer may still claim the gesture once the
        // finger has travelled far enough to know which way it is going.
        claimedRef.current =
            scrollable && !isAtDismissStartEdge(scrollable.element, scrollable.axis, dismissDirection)
                ? false
                : null;

        if (claimedRef.current !== false) {
            startGesture({ x: touch.clientX, y: touch.clientY }, eventTime(event));
        }
    }, [active, dismissDirection, elementRef, startGesture]);

    const onTouchMove = useCallback((event: React.TouchEvent<HTMLElement>) => {
        const gesture = gestureRef.current;
        if (claimedRef.current === false) return;
        if (!gesture) return;

        const touch = event.touches[0];
        if (!touch) return;

        const deltaX = touch.clientX - gesture.start.x;
        const deltaY = touch.clientY - gesture.start.y;
        const along = axis === 'x' ? deltaX : deltaY;
        const across = axis === 'x' ? deltaY : deltaX;

        if (gesture.axis === null) {
            if (Math.abs(along) < AXIS_LOCK_SLOP) return;
            if (Math.abs(across) > Math.abs(along)) {
                // Diagonal or cross-axis: leave the gesture to native scrolling.
                claimedRef.current = false;
                gestureRef.current = null;
                setSwipingState(false);
                return;
            }
            gesture.axis = axis;
        }

        // A drag away from dismissal is a scroll, not a dismissal.
        if (getDisplacement(dismissDirection, deltaX, deltaY) < 0) {
            claimedRef.current = false;
            gestureRef.current = null;
            setSwipingState(false);
            return;
        }

        claimedRef.current = true;
        gesture.dragging = true;
        if (event.cancelable) event.preventDefault();

        recordSample(touch.clientX, touch.clientY, eventTime(event));
        applyDisplacement(deltaX, deltaY);
    }, [applyDisplacement, axis, dismissDirection, recordSample, setSwipingState]);

    const onTouchEnd = useCallback((event: React.TouchEvent<HTMLElement>) => {
        const touch = event.changedTouches[0];
        if (!touch) {
            gestureRef.current = null;
            snapBack();
            return;
        }
        finishGesture({ x: touch.clientX, y: touch.clientY }, eventTime(event));
    }, [finishGesture, snapBack]);

    const onTouchCancel = useCallback(() => {
        claimedRef.current = false;
        gestureRef.current = null;
        offsetRef.current = 0;
        snapBack();
    }, [snapBack]);

    // ── Cleanup ─────────────────────────────────────────────────────────────

    useEffect(() => {
        return () => {
            if (snapBackTimerRef.current) clearTimeout(snapBackTimerRef.current);
        };
    }, []);

    // Reset if the drawer closes or loses eligibility mid-gesture.
    useEffect(() => {
        if (active) return;
        gestureRef.current = null;
        claimedRef.current = null;
        offsetRef.current = 0;
        lastSampleRef.current = null;
        setSwipingState(false);
    }, [active, setSwipingState]);

    useEffect(() => {
        if (enabled) return;
        const element = elementRef.current;
        if (!element) return;
        clearDragStyles();
    }, [clearDragStyles, elementRef, enabled]);

    return {
        swiping,
        isSnapping,
        pointerProps: { onPointerDown },
        touchProps: { onTouchStart, onTouchMove, onTouchEnd, onTouchCancel },
    };
}
