'use client';
import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import {
    DrawerChangeReason,
    DrawerContext,
    DrawerOpenChangeEventDetails,
    DrawerRootActions,
} from '../context/DrawerContext';
import type { DrawerSnapPoint } from '../utils/drawerMath';
import { getDismissDirection, normalizeDrawerSide } from '../utils/drawerMath';
import { useDrawerNesting } from '../context/DrawerNestingContext';
import { DrawerNestingContext } from '../context/DrawerNestingContext';
import { readDrawerDurationMs, whenAnimationsFinish } from '../utils/drawerAnimation';
import DialogPrimitive from '~/core/primitives/Dialog';

const COMPONENT_NAME = 'Drawer';

// ── Types ──────────────────────────────────────────────────────────────────

export type DrawerRootProps = {
    children?: React.ReactNode;
    className?: string;
    customRootClass?: string;

    // ── Open state ───────────────────────────────────────────────────────────
    /** Uncontrolled initial open state. */
    defaultOpen?: boolean;
    /** Controlled open state. */
    open?: boolean;
    /**
     * Called when the drawer requests an open state change.
     *
     * Call `eventDetails.cancel()` to veto the change, which is how you show a
     * "discard your changes?" confirmation before the drawer closes. The second
     * argument carries the `reason` so you can react to the source of the request.
     */
    onOpenChange?: (open: boolean, eventDetails: DrawerOpenChangeEventDetails) => void;
    /** Called once the open or close animation has fully completed. */
    onOpenChangeComplete?: (open: boolean) => void;

    // ── Snap points ──────────────────────────────────────────────────────────
    /**
     * Resting heights for a vertical drawer. Numbers between 0 and 1 are
     * fractions of the viewport height, numbers above 1 are pixels, and strings
     * accept `px` and `rem` (for example `'148px'` or `'30rem'`).
     */
    snapPoints?: DrawerSnapPoint[];
    /** Initial snap point when uncontrolled. Defaults to the first snap point. */
    defaultSnapPoint?: DrawerSnapPoint | null;
    /** Controlled active snap point. `null` means fully expanded. */
    snapPoint?: DrawerSnapPoint | null;
    /** Called when the active snap point changes. */
    onSnapPointChange?: (snapPoint: DrawerSnapPoint | null) => void;
    /**
     * Disables velocity-based snap skipping, so the resting point is decided by
     * drag distance alone. You can still drag past several points.
     */
    snapToSequentialPoints?: boolean;

    // ── Behaviour ────────────────────────────────────────────────────────────
    /**
     * Modal mode.
     * - `true` (default): focus trapped, scroll locked, outside pointer events disabled.
     * - `false`: full document interaction allowed.
     * - `'trap-focus'`: focus trapped, but scroll and outside pointer events remain enabled.
     */
    modal?: boolean | 'trap-focus';
    /** When true, outside presses and the Escape key do not close the drawer. */
    disablePointerDismissal?: boolean;
    /**
     * The side the drawer is docked on, which is also the direction you drag to
     * dismiss it. `up` and `down` are accepted as aliases for `top` and `bottom`.
     */
    swipeDirection?: 'left' | 'right' | 'top' | 'bottom' | 'up' | 'down';

    // ── Trigger association ──────────────────────────────────────────────────
    /** ID of the trigger associated with this drawer (controlled). */
    triggerId?: string | null;
    /** ID of the trigger associated with this drawer (uncontrolled / defaultOpen). */
    defaultTriggerId?: string | null;

    // ── Imperative handle ────────────────────────────────────────────────────
    /**
     * Ref to imperative actions.
     * - `close()`: closes the drawer programmatically.
     * - `unmount()`: unmounts the drawer. Needed when a close was held open with
     *   `eventDetails.preventUnmountOnClose()` for a custom close animation.
     */
    actionsRef?: React.RefObject<DrawerRootActions | null>;
};

// ── Component ──────────────────────────────────────────────────────────────

const DrawerRoot = forwardRef<HTMLDivElement, DrawerRootProps>(({
    children,
    customRootClass = '',
    className = '',
    // Open state
    defaultOpen = false,
    open: controlledOpen,
    onOpenChange,
    onOpenChangeComplete,
    // Snap points
    snapPoints = [],
    defaultSnapPoint = null,
    snapPoint: controlledSnapPoint,
    onSnapPointChange,
    snapToSequentialPoints = false,
    // Behaviour
    modal = true,
    disablePointerDismissal = false,
    swipeDirection = 'right',
    // Trigger association (stored for potential future use)
    triggerId: _triggerId,
    defaultTriggerId: _defaultTriggerId,
    // Imperative handle
    actionsRef,
}, ref) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);

    const side = useMemo(() => normalizeDrawerSide(swipeDirection), [swipeDirection]);
    const dismissDirection = useMemo(() => getDismissDirection(side), [side]);

    // ── Nesting ──────────────────────────────────────────────────────────────
    const parentNesting = useDrawerNesting();

    // ── Open state (uncontrolled fallback) ───────────────────────────────────
    const isControlled = controlledOpen !== undefined;
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const isOpen = isControlled ? controlledOpen! : uncontrolledOpen;

    // Read through a ref so callbacks registered once (imperative actions,
    // animation completion) always observe the current value.
    const isOpenRef = useRef(isOpen);
    isOpenRef.current = isOpen;

    /**
     * Every close path funnels through the shared dialog primitive, which cannot
     * say *why* it was asked to close. Fragments declare their reason here first,
     * so the root can attribute the change and so `disablePointerDismissal` only
     * blocks the dismissals it is meant to block.
     */
    const pendingReasonRef = useRef<DrawerChangeReason | null>(null);
    const intentionalCloseRef = useRef(false);

    // Read through a ref so a cached callback always sees the latest value.
    const disablePointerDismissalRef = useRef(disablePointerDismissal);
    useEffect(() => { disablePointerDismissalRef.current = disablePointerDismissal; }, [disablePointerDismissal]);

    // Held open by `preventUnmountOnClose`, released by `actionsRef.unmount()`.
    const [holdOpen, setHoldOpen] = useState(false);

    /** Set by a fragment that is about to request a close it owns. */
    const markIntentionalClose = useCallback((reason: DrawerChangeReason = 'close-press') => {
        intentionalCloseRef.current = true;
        pendingReasonRef.current = reason;
    }, []);

    const handleOpenChange = useCallback((next: boolean, event?: Event) => {
        const reason = pendingReasonRef.current ?? (next ? 'trigger-press' : 'none');
        pendingReasonRef.current = null;

        const intentional = intentionalCloseRef.current;
        intentionalCloseRef.current = false;

        // Outside presses and Escape are the dismissals this flag is about.
        if (!next && disablePointerDismissalRef.current && !intentional) return;

        let canceled = false;
        let keepMounted = false;
        const details: DrawerOpenChangeEventDetails = {
            reason,
            cancel: () => { canceled = true; },
            get isCanceled() { return canceled; },
            preventUnmountOnClose: () => { keepMounted = true; },
            event,
        };

        if (onOpenChange) {
            if (onOpenChange.length <= 1) {
                (onOpenChange as (open: boolean) => void)(next);
            } else {
                onOpenChange(next, details);
            }
        }
        if (canceled) return;

        if (keepMounted) setHoldOpen(true);
        if (!isControlled) setUncontrolledOpen(next);
    }, [isControlled, onOpenChange]);

    // Reopening always releases a held close, since there is nothing left to
    // animate away.
    useEffect(() => { if (isOpen) setHoldOpen(false); }, [isOpen]);

    // ── Snap point state (uncontrolled fallback) ─────────────────────────────
    const isSnapControlled = controlledSnapPoint !== undefined;
    const [uncontrolledSnapPoint, setUncontrolledSnapPoint] = useState<DrawerSnapPoint | null>(
        defaultSnapPoint ?? (snapPoints.length > 0 ? snapPoints[0] : null),
    );
    const activeSnapPoint = isSnapControlled ? controlledSnapPoint! : uncontrolledSnapPoint;

    const setActiveSnapPoint = useCallback((point: DrawerSnapPoint | null) => {
        if (!isSnapControlled) setUncontrolledSnapPoint(point);
        onSnapPointChange?.(point);
    }, [isSnapControlled, onSnapPointChange]);

    // ── Measured popup height ────────────────────────────────────────────────
    // Resolving snap points needs a real px height, which only the popup knows.
    const [popupHeight, setPopupHeightState] = useState(0);
    const setPopupHeight = useCallback((height: number) => {
        setPopupHeightState((current) => (current === height ? current : height));
    }, []);

    // ── Imperative actions ───────────────────────────────────────────────────
    const registerActions = useCallback((actions: DrawerRootActions) => {
        if (actionsRef && 'current' in actionsRef) {
            (actionsRef as React.MutableRefObject<DrawerRootActions | null>).current = actions;
        }
    }, [actionsRef]);

    useEffect(() => {
        if (!actionsRef) return;
        const actions: DrawerRootActions = {
            close: () => {
                markIntentionalClose('imperative-action');
                handleOpenChange(false);
            },
            unmount: () => {
                // Release the hold, and if the drawer is still open (a controlled
                // root that never adopted the close) actually close it, so the
                // exit animation can play.
                setHoldOpen(false);
                if (isOpenRef.current && !isControlled) {
                    markIntentionalClose('imperative-action');
                    handleOpenChange(false);
                }
                setUncontrolledSnapPoint(defaultSnapPoint ?? (snapPoints[0] ?? null));
            },
        };
        registerActions(actions);
    }, [actionsRef, defaultSnapPoint, handleOpenChange, isControlled, markIntentionalClose, registerActions, snapPoints]);

    // ── Animation completion ─────────────────────────────────────────────────
    // Owned here rather than in the parts, so the callback fires exactly once per
    // transition whether or not Drawer.Overlay and Drawer.Content are both mounted.
    const contentElementRef = useRef<HTMLElement | null>(null);
    const registerContentElement = useCallback((element: HTMLElement | null) => {
        contentElementRef.current = element;
    }, []);

    const onOpenChangeCompleteRef = useRef(onOpenChangeComplete);
    onOpenChangeCompleteRef.current = onOpenChangeComplete;

    useEffect(() => {
        const controller = new AbortController();
        const opening = isOpen;

        const run = () => {
            const element = contentElementRef.current;
            if (!onOpenChangeCompleteRef.current) return;
            whenAnimationsFinish(element, readDrawerDurationMs(element, opening ? 'open' : 'close'), controller.signal)
                .then(() => {
                    if (!controller.signal.aborted) onOpenChangeCompleteRef.current?.(isOpenRef.current);
                });
        };

        // One frame so the `data-state` flip has been committed before we read
        // which animations are running.
        const raf = requestAnimationFrame(run);
        return () => {
            controller.abort();
            cancelAnimationFrame(raf);
        };
    }, [isOpen]);

    // ── Bubble open state to parent nesting context ───────────────────────────
    // notifiedParentRef tracks whether we currently hold a +1 on the parent's
    // childOpenCount so we can always decrement exactly once on close/unmount.
    const notifiedParentRef = useRef(false);
    useEffect(() => {
        if (isOpen && !notifiedParentRef.current) {
            notifiedParentRef.current = true;
            parentNesting.onChildOpenChange(true);
        } else if (!isOpen && notifiedParentRef.current) {
            notifiedParentRef.current = false;
            parentNesting.onChildOpenChange(false);
        }
    }, [isOpen, parentNesting]);

    // On unmount while open: decrement the parent count exactly once.
    useEffect(() => {
        return () => {
            if (notifiedParentRef.current) {
                parentNesting.onChildOpenChange(false);
                notifiedParentRef.current = false;
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // mount/unmount only

    // ── Nesting context for children ─────────────────────────────────────────
    // Children call onChildOpenChange to update this drawer's childOpenCount
    // AND bubble the event up to all ancestors.
    const [childOpenCount, setChildOpenCount] = useState(0);
    const handleChildOpenChange = useCallback((open: boolean) => {
        setChildOpenCount((n) => Math.max(0, n + (open ? 1 : -1)));
        // Bubble up so grandparents also widen
        parentNesting.onChildOpenChange(open);
    }, [parentNesting]);

    // A child's drag is published up the same way, so an ancestor never fights a
    // gesture that is actually happening one level below it.
const [nestedSwiping, setNestedSwipingState] = useState(false);
    const handleChildSwipingChange = useCallback((swiping: boolean) => {
        setNestedSwipingState(swiping);
        parentNesting.onChildSwipingChange(swiping);
    }, [parentNesting]);

    // Bubbling a child's swipe must not leave a stale `true` behind when that
    // child unmounts mid-drag.
    useEffect(() => { if (!childOpenCount) setNestedSwipingState(false); }, [childOpenCount]);

    const setNestedSwiping = handleChildSwipingChange;

    const nestingContextValue = useMemo(() => ({
        depth: parentNesting.depth + 1,
        onChildOpenChange: handleChildOpenChange,
        onChildSwipingChange: handleChildSwipingChange,
    }), [handleChildOpenChange, handleChildSwipingChange, parentNesting.depth]);

    const requestClose = useCallback((reason: DrawerChangeReason, event?: Event) => {
        markIntentionalClose(reason);
        handleOpenChange(false, event);
    }, [handleOpenChange, markIntentionalClose]);

    // ── Auto-wired labelling ────────────────────────────────────────────────
    // Drawer.Title / Drawer.Description publish their ids here so Drawer.Content
    // can name the dialog without the consumer wiring ids by hand.
    const [titleId, setTitleIdState] = useState<string | undefined>(undefined);
    const [descriptionId, setDescriptionIdState] = useState<string | undefined>(undefined);

    const setTitleId = useCallback((id: string | undefined) => {
        setTitleIdState((current) => (current === id ? current : id));
    }, []);
    const setDescriptionId = useCallback((id: string | undefined) => {
        setDescriptionIdState((current) => (current === id ? current : id));
    }, []);

const contextValue = useMemo(() => ({
        rootClass,
        side,
        dismissDirection,
        isOpen,
        onOpen: () => handleOpenChange(true),
        snapPoints,
        activeSnapPoint,
        setActiveSnapPoint,
        snapToSequentialPoints,
        popupHeight,
        setPopupHeight,
        modal,
        disablePointerDismissal,
        registerContentElement,
        shouldKeepMounted: holdOpen,
        requestClose,
        markIntentionalClose,
        childOpenCount,
        nestedSwiping,
        setNestedSwiping,
        titleId,
        descriptionId,
        setTitleId,
        setDescriptionId,
        depth: parentNesting.depth,
    }), [
        activeSnapPoint, childOpenCount, descriptionId, dismissDirection, disablePointerDismissal,
        handleOpenChange, holdOpen, isOpen, markIntentionalClose, modal, parentNesting.depth,
        popupHeight, registerContentElement, requestClose, rootClass, setActiveSnapPoint,
        setDescriptionId, setNestedSwiping, setPopupHeight, setTitleId, side,
        snapPoints, snapToSequentialPoints, nestedSwiping, titleId,
    ]);

    return (
        <DrawerNestingContext.Provider value={nestingContextValue}>
            <DialogPrimitive.Root
                ref={ref}
                open={isOpen}
                onOpenChange={handleOpenChange}
                className={clsx(rootClass, className)}
                disablePointerDismissal={disablePointerDismissal}
            >
                <DrawerContext.Provider value={contextValue}>
                    {children}
                </DrawerContext.Provider>
            </DialogPrimitive.Root>
        </DrawerNestingContext.Provider>
    );
});

DrawerRoot.displayName = COMPONENT_NAME;

export default DrawerRoot;
