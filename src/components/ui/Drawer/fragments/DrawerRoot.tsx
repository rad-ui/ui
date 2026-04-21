'use client';
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import { DrawerContext, DrawerRootActions, DrawerSnapPoint } from '../context/DrawerContext';
import { DrawerNestingContext, useDrawerNesting } from '../context/DrawerNestingContext';
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
    /** Called when the drawer opens or closes. */
    onOpenChange?: (open: boolean) => void;
    /** Called after open/close animations fully complete. */
    onOpenChangeComplete?: (open: boolean) => void;

    // ── Snap points ──────────────────────────────────────────────────────────
    /**
     * Snap points for the drawer. Use 0–1 for viewport fractions,
     * numbers > 1 for pixel values, or strings like '148px' / '30rem'.
     */
    snapPoints?: DrawerSnapPoint[];
    /** Initial snap point when uncontrolled. */
    defaultSnapPoint?: DrawerSnapPoint | null;
    /** Controlled active snap point. */
    snapPoint?: DrawerSnapPoint | null;
    /** Called when the active snap point changes. */
    onSnapPointChange?: (snapPoint: DrawerSnapPoint | null) => void;
    /** Disables velocity-based snap skipping; drag distance determines next snap point. */
    snapToSequentialPoints?: boolean;

    // ── Behaviour ────────────────────────────────────────────────────────────
    /**
     * Modal mode.
     * - `true` (default): focus trapped, scroll locked, outside pointer events disabled.
     * - `false`: full document interaction allowed.
     * - `'trap-focus'`: focus trapped, but scroll and outside pointer events remain enabled.
     */
    modal?: boolean | 'trap-focus';
    /** When true, clicking outside the drawer does not close it. */
    disablePointerDismissal?: boolean;
    /** Direction the user swipes to dismiss the drawer. */
    swipeDirection?: 'left' | 'right' | 'top' | 'bottom';

    // ── Trigger association ──────────────────────────────────────────────────
    /** ID of the trigger associated with this drawer (controlled). */
    triggerId?: string | null;
    /** ID of the trigger associated with this drawer (uncontrolled / defaultOpen). */
    defaultTriggerId?: string | null;

    // ── Imperative handle ────────────────────────────────────────────────────
    /**
     * Ref to imperative actions.
     * - `close()`: closes the drawer programmatically.
     * - `unmount()`: when provided, the drawer will not unmount automatically on close;
     *   call this to unmount it manually (useful for externally-controlled animations).
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
    snapToSequentialPoints: _snapToSequentialPoints = false,
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

    // ── Nesting ──────────────────────────────────────────────────────────────
    const parentNesting = useDrawerNesting();

    // ── Open state (uncontrolled fallback) ───────────────────────────────────
    const isControlled = controlledOpen !== undefined;
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const isOpen = isControlled ? controlledOpen! : uncontrolledOpen;

    // When disablePointerDismissal is true we need to block the close that
    // floating-ui's useDismiss fires via onOpenChange on outside pointer events.
    // We do this by tracking whether a close was initiated by our own imperative
    // code (actionsRef / Drawer.Close) vs floating-ui's dismiss handler.
    // The trick: we set a flag just before any intentional close, then in
    // onOpenChange we only allow a close-to-false if the flag is set OR
    // disablePointerDismissal is false.
    const intentionalCloseRef = useRef(false);
    // Use a ref so the handleOpenChange closure always reads the latest value
    // even when floating-ui has cached an older version of the callback.
    const disablePointerDismissalRef = useRef(disablePointerDismissal);
    useEffect(() => { disablePointerDismissalRef.current = disablePointerDismissal; }, [disablePointerDismissal]);

    const handleOpenChange = useCallback((next: boolean) => {
        if (!next && disablePointerDismissalRef.current && !intentionalCloseRef.current) {
            return;
        }
        intentionalCloseRef.current = false;
        if (!isControlled) setUncontrolledOpen(next);
        onOpenChange?.(next);
    }, [isControlled, onOpenChange]);

    // ── Snap point state (uncontrolled fallback) ─────────────────────────────
    const isSnapControlled = controlledSnapPoint !== undefined;
    const [uncontrolledSnapPoint, setUncontrolledSnapPoint] = useState<DrawerSnapPoint | null>(
        defaultSnapPoint ?? (snapPoints.length > 0 ? snapPoints[0] : null)
    );
    const activeSnapPoint = isSnapControlled ? controlledSnapPoint! : uncontrolledSnapPoint;

    const setActiveSnapPoint = useCallback((point: DrawerSnapPoint | null) => {
        if (!isSnapControlled) setUncontrolledSnapPoint(point);
        onSnapPointChange?.(point);
    }, [isSnapControlled, onSnapPointChange]);

    // ── Imperative actions ───────────────────────────────────────────────────
    const registerActions = useCallback((actions: DrawerRootActions) => {
        if (actionsRef && 'current' in actionsRef) {
            (actionsRef as React.MutableRefObject<DrawerRootActions | null>).current = actions;
        }
    }, [actionsRef]);

    // Register close/unmount actions whenever handleOpenChange changes
    useEffect(() => {
        if (!actionsRef) return;
        const actions: DrawerRootActions = {
            close: () => {
                intentionalCloseRef.current = true;
                handleOpenChange(false);
            },
            unmount: () => {
                intentionalCloseRef.current = true;
                handleOpenChange(false);
            },
        };
        registerActions(actions);
    }, [actionsRef, handleOpenChange, registerActions]);

    // ── Bubble open state to parent nesting context ───────────────────────────
    // notifiedParentRef tracks whether we currently hold a +1 on the parent's
    // childOpenCount so we can always decrement exactly once on close/unmount.
    // We do NOT call parentNesting.onChildOpenChange here — that is owned
    // exclusively by handleChildOpenChange on the parent, which also bubbles
    // upward. This effect only handles the defaultOpen and unmount-while-open
    // edge cases by going through the parent's handleChildOpenChange path
    // via the nestingContext the parent provided.
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

    const nestingContextValue = {
        depth: parentNesting.depth + 1,
        onChildOpenChange: handleChildOpenChange,
    };

    // Expose childOpenCount via context so DrawerContent can react to it
    const contextValue = {
        rootClass,
        swipeDirection,
        isOpen,
        onOpen: () => handleOpenChange(true),
        snapPoints,
        activeSnapPoint,
        setActiveSnapPoint,
        modal,
        disablePointerDismissal,
        onOpenChangeComplete,
        registerActions,
        markIntentionalClose: () => { intentionalCloseRef.current = true; },
        childOpenCount,
    };

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
