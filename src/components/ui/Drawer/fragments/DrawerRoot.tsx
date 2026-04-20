'use client';

import React, { forwardRef, useContext, useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import DialogPrimitive from '~/core/primitives/Dialog';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import {
    DrawerContext,
    type DrawerSnapPoint,
    type DrawerRootChangeEventDetails,
    type DrawerHandleLike,
    type DrawerSwipeDirection
} from '../context/DrawerContext';
import DrawerProviderContext from '../context/DrawerProviderContext';

const COMPONENT_NAME = 'Drawer';

type DrawerRootElement = React.ElementRef<typeof DialogPrimitive.Root>;
type DialogPrimitiveRootProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>;
type PayloadChildRenderFunction = (arg: { payload: unknown | undefined }) => React.ReactNode;
type DrawerRootActions = {
    close: () => void;
    unmount: () => void;
};

export type DrawerRootProps = Omit<DialogPrimitiveRootProps, 'onOpenChange'> & {
    children?: React.ReactNode | PayloadChildRenderFunction;
    className?: string;
    customRootClass?: string;
    defaultOpen?: boolean;
    swipeDirection?: DrawerSwipeDirection;
    modal?: boolean | 'trap-focus';
    handle?: DrawerHandleLike | null;
    triggerId?: string | null;
    defaultTriggerId?: string | null;
    snapPoints?: DrawerSnapPoint[];
    defaultSnapPoint?: DrawerSnapPoint | null;
    snapPoint?: DrawerSnapPoint | null;
    onSnapPointChange?: (snapPoint: DrawerSnapPoint | null) => void;
    actionsRef?: React.MutableRefObject<DrawerRootActions | null>;
    onOpenChange?: (open: boolean, eventDetails: DrawerRootChangeEventDetails) => void;
    onOpenChangeComplete?: (open: boolean) => void;
};

const DrawerRoot = forwardRef<DrawerRootElement, DrawerRootProps>(({
    children,
    className = '',
    customRootClass = '',
    defaultOpen = false,
    swipeDirection = 'down',
    modal = true,
    handle = null,
    triggerId = null,
    defaultTriggerId = null,
    snapPoints = [],
    defaultSnapPoint = null,
    snapPoint,
    onSnapPointChange,
    actionsRef,
    open,
    onOpenChange,
    onOpenChangeComplete,
    ...props
}, ref) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
    const providerContext = useContext(DrawerProviderContext);
    const parentDrawer = useContext(DrawerContext);
    const [nestedDrawerCount, setNestedDrawerCount] = useState(0);
    const [nestedDrawerSwipingCount, setNestedDrawerSwipingCount] = useState(0);
    const [payload, setPayload] = useState<unknown>(undefined);
    const [internalOpen, setInternalOpen] = useState(open !== undefined ? Boolean(open) : defaultOpen);
    const [handleOpen, setHandleOpen] = useState(false);
    const [activeTriggerId, setActiveTriggerId] = useState(defaultTriggerId);
    const [internalSnapPoint, setInternalSnapPoint] = useState<DrawerSnapPoint | null>(defaultSnapPoint);
    const registeredProviderCleanupRef = useRef<(() => void) | null>(null);
    const openCompleteTimeoutRef = useRef<number | null>(null);
    const pendingChangeDetailsRef = useRef<Partial<Pick<DrawerRootChangeEventDetails, 'reason' | 'event' | 'trigger'>> | null>(null);
    const isControlledByHandle = Boolean(handle);
    const isControlled = isControlledByHandle || open !== undefined;
    const isOpen = isControlledByHandle ? handleOpen : open !== undefined ? Boolean(open) : internalOpen;
    const isNested = parentDrawer.rootClass !== '';
    const nestingLevel = isNested ? parentDrawer.nestingLevel + 1 : 0;
    const isSnapControlled = snapPoint !== undefined;
    const activeSnapPoint = isSnapControlled ? snapPoint ?? null : internalSnapPoint;
    const expanded = snapPoints.length === 0 || activeSnapPoint === null;

    useEffect(() => {
        if (open !== undefined) {
            setInternalOpen(Boolean(open));
        }
    }, [open]);

    useEffect(() => {
        if (snapPoint !== undefined) {
            setInternalSnapPoint(snapPoint ?? null);
        }
    }, [snapPoint]);

    useEffect(() => {
        if (!handle) {
            return;
        }

        const syncFromHandle = () => {
            setHandleOpen(handle.isOpen);
            setPayload(handle.payload);
            setActiveTriggerId(handle.triggerId ?? null);
        };

        syncFromHandle();
        return handle.subscribe(syncFromHandle);
    }, [handle]);

    useEffect(() => {
        if (isOpen && !registeredProviderCleanupRef.current) {
            registeredProviderCleanupRef.current = providerContext.registerOpenDrawer();
            return;
        }

        if (!isOpen && registeredProviderCleanupRef.current) {
            registeredProviderCleanupRef.current();
            registeredProviderCleanupRef.current = null;
        }
    }, [isOpen, providerContext]);

    useEffect(() => {
        return () => {
            if (registeredProviderCleanupRef.current) {
                registeredProviderCleanupRef.current();
                registeredProviderCleanupRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (openCompleteTimeoutRef.current !== null) {
            window.clearTimeout(openCompleteTimeoutRef.current);
        }

        openCompleteTimeoutRef.current = window.setTimeout(() => {
            onOpenChangeComplete?.(isOpen);
            openCompleteTimeoutRef.current = null;
        }, 420);

        return () => {
            if (openCompleteTimeoutRef.current !== null) {
                window.clearTimeout(openCompleteTimeoutRef.current);
                openCompleteTimeoutRef.current = null;
            }
        };
    }, [isOpen, onOpenChangeComplete]);

    useEffect(() => {
        if (triggerId !== null) {
            setActiveTriggerId(triggerId);
        }
    }, [triggerId]);

    const setPendingChangeDetails = React.useCallback((details?: Partial<Pick<DrawerRootChangeEventDetails, 'reason' | 'event' | 'trigger'>>) => {
        pendingChangeDetailsRef.current = details ?? null;
    }, []);

    const createChangeDetails = React.useCallback((
        details?: Partial<Pick<DrawerRootChangeEventDetails, 'reason' | 'event' | 'trigger'>>
    ): DrawerRootChangeEventDetails => {
        const changeDetails: DrawerRootChangeEventDetails = {
            reason: details?.reason ?? 'none',
            event: details?.event ?? new Event('drawer-change'),
            trigger: details?.trigger,
            isCanceled: false,
            isPropagationAllowed: false,
            cancel() {
                changeDetails.isCanceled = true;
            },
            allowPropagation() {
                changeDetails.isPropagationAllowed = true;
            },
            preventUnmountOnClose() {}
        };

        return changeDetails;
    }, []);

    const registerNestedDrawerOpen = React.useCallback((nextOpen: boolean) => {
        setNestedDrawerCount((current) => current + (nextOpen ? 1 : -1));

        return () => {
            setNestedDrawerCount((current) => Math.max(0, current + (nextOpen ? -1 : 1)));
        };
    }, []);

    const registerNestedDrawerSwiping = React.useCallback((swiping: boolean) => {
        setNestedDrawerSwipingCount((current) => current + (swiping ? 1 : -1));

        return () => {
            setNestedDrawerSwipingCount((current) => Math.max(0, current + (swiping ? -1 : 1)));
        };
    }, []);

    useEffect(() => {
        if (!isNested) {
            return;
        }

        return parentDrawer.registerNestedDrawerOpen(isOpen);
    }, [isNested, isOpen, parentDrawer]);

    const handleRootOpenChange = React.useCallback((nextOpen: boolean) => {
        const details = createChangeDetails(pendingChangeDetailsRef.current ?? undefined);
        pendingChangeDetailsRef.current = null;

        if (details.isCanceled) {
            return;
        }

        if (!isControlled) {
            setInternalOpen(nextOpen);
        }

        if (handle) {
            if (nextOpen) {
                handle.open(activeTriggerId);
            } else {
                handle.close();
            }
        }

        onOpenChange?.(nextOpen, details as any);
    }, [activeTriggerId, createChangeDetails, handle, isControlled, onOpenChange]);

    const requestOpenChange = React.useCallback((
        nextOpen: boolean,
        details?: Partial<Pick<DrawerRootChangeEventDetails, 'reason' | 'event' | 'trigger'>>
    ) => {
        setPendingChangeDetails(details);
        handleRootOpenChange(nextOpen);
    }, [handleRootOpenChange, setPendingChangeDetails]);

    const handleSnapPointChange = React.useCallback((nextSnapPoint: DrawerSnapPoint | null) => {
        if (!isSnapControlled) {
            setInternalSnapPoint(nextSnapPoint);
        }

        onSnapPointChange?.(nextSnapPoint);
    }, [isSnapControlled, onSnapPointChange]);

    useEffect(() => {
        if (!actionsRef) {
            return;
        }

        actionsRef.current = {
            close: () => requestOpenChange(false, { reason: 'imperative-action', event: new Event('imperative-action') }),
            unmount: () => requestOpenChange(false, { reason: 'imperative-action', event: new Event('imperative-action') })
        };

        return () => {
            actionsRef.current = null;
        };
    }, [actionsRef, requestOpenChange]);

    const contextValue = useMemo(() => ({
        rootClass,
        swipeDirection,
        open: isOpen,
        modal,
        nested: isNested,
        nestingLevel,
        nestedDrawerCount,
        nestedDrawerOpen: nestedDrawerCount > 0,
        nestedDrawerSwiping: nestedDrawerSwipingCount > 0,
        snapPoints,
        snapPoint: activeSnapPoint,
        expanded,
        setSnapPoint: handleSnapPointChange,
        payload,
        setPayload,
        registerNestedDrawerOpen,
        registerNestedDrawerSwiping,
        handle,
        activeTriggerId,
        setActiveTriggerId,
        requestOpenChange,
        setPendingChangeDetails
    }), [
        activeTriggerId,
        handle,
        isNested,
        isOpen,
        modal,
        nestedDrawerCount,
        nestedDrawerSwipingCount,
        nestingLevel,
        snapPoints,
        activeSnapPoint,
        expanded,
        handleSnapPointChange,
        payload,
        registerNestedDrawerOpen,
        registerNestedDrawerSwiping,
        requestOpenChange,
        rootClass,
        setPendingChangeDetails,
        swipeDirection
    ]);

    return (
        <DialogPrimitive.Root
            ref={ref}
            className={clsx(rootClass, className)}
            data-swipe-direction={swipeDirection}
            open={isOpen}
            onOpenChange={handleRootOpenChange}
            onClickOutside={() => {
                setPendingChangeDetails({
                    reason: 'outside-press',
                    event: new Event('outside-press')
                });
            }}
            {...props}
        >
            <DrawerContext.Provider value={contextValue}>
                {typeof children === 'function'
                    ? children({ payload })
                    : children}
            </DrawerContext.Provider>
        </DialogPrimitive.Root>
    );
});

DrawerRoot.displayName = COMPONENT_NAME;

export default DrawerRoot;
