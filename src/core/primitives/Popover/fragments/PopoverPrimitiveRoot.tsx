'use client';

import React, { forwardRef } from 'react';
import Floater from '~/core/primitives/Floater';
import Primitive from '~/core/primitives/Primitive';
import { useControllableState } from '~/core/hooks/useControllableState';
import { useRegisterDocumentOverlayOpen } from '~/core/hooks/useRegisterDocumentOverlayOpen';
import {
    defaultPopoverPositioning,
    PopoverPrimitiveContext,
    PopoverTriggerHover
} from '../context/PopoverPrimitiveContext';
import { anchorTracking, collisionMiddleware } from '~/core/utils/placement';
import { useFloatingAnchor } from '~/core/hooks/useFloatingAnchor';
import type { PopupHandle } from '~/core/utils/popupHandle';
import { callOpenChange, createOpenChangeDetails, fromFloatingReason, OpenChangeDetails, OpenChangeReason } from '~/core/utils/openChangeDetails';
import { usePopupActions, PopupActions } from '~/core/hooks/usePopupActions';
import { stateData } from '~/core/utils/stateAttributes';
import { useHandleTriggerId } from '~/core/utils/popupHandle';

const noop = () => {};

export type PopoverPrimitiveRootProps = Omit<React.ComponentPropsWithoutRef<typeof Primitive.div>, 'children'> & {
    /** Content, or a function of the payload passed by the trigger that opened it (with `handle`). */
    children: React.ReactNode | ((state: { payload: unknown }) => React.ReactNode);
    /** Connects detached triggers made with `createHandle()`; the popover anchors to whichever opened it. */
    handle?: PopupHandle<any>;
    /**
     * With `handle`: the DOM `id` of the detached trigger the popup belongs to while open.
     * It is anchored to that trigger and gets its payload, also when opened from code.
     */
    triggerId?: string | null;
    /** Uncontrolled `triggerId`: the trigger used when the popup opens without one (e.g. `defaultOpen`). */
    defaultTriggerId?: string | null;
    open?: boolean;
    defaultOpen?: boolean;
    /**
     * Called with the next open state and details: `reason` (such as
     * `trigger-press`, `outside-press`, `escape-key`), the `event`, and
     * `cancel()` to keep it as it is.
     */
    onOpenChange?: (open: boolean, details: OpenChangeDetails) => void;
    /**
     * `true`: focus is trapped and the rest of the page is inert while open. `'trap-focus'`: focus
     * is trapped but the page still takes pointer input. `false` (default): neither.
     */
    modal?: boolean | 'trap-focus';
    /** Also open while the pointer rests on the trigger, like a hover card. Clicking still toggles. */
    openOnHover?: boolean;
    /** With `openOnHover`, ms the pointer must rest before opening. */
    hoverOpenDelay?: number;
    /** With `openOnHover`, ms after the pointer leaves before closing. */
    hoverCloseDelay?: number;
    /** Called after the open or close animations finish (at once when there are none). */
    onOpenChangeComplete?: (open: boolean) => void;
    /** Ref with `close()`, to close the popup from code (reason `'imperative-action'`). */
    actionsRef?: React.Ref<PopupActions>;
};

const COMPONENT_NAME = 'PopoverPrimitive';
type OutsideInteractionEvent<T extends Event> = import('../context/PopoverPrimitiveContext').PopoverOutsideInteractionEvent<T>;
type ContentEventHandlers = {
    onEscapeKeyDown?: (event: KeyboardEvent) => void;
    onPointerDownOutside?: (event: OutsideInteractionEvent<PointerEvent>) => void;
    onFocusOutside?: (event: OutsideInteractionEvent<FocusEvent>) => void;
    onInteractOutside?: (event: OutsideInteractionEvent<PointerEvent | FocusEvent>) => void;
};

const getPlacement = (side: 'top' | 'right' | 'bottom' | 'left', align: 'start' | 'center' | 'end') => {
    if (align === 'center') {
        return side;
    }

    return `${side}-${align}` as const;
};

const createOutsideInteractionEvent = <T extends Event>(event: T): OutsideInteractionEvent<T> => {
    let defaultPrevented = false;

    return {
        originalEvent: event,
        get defaultPrevented() {
            return defaultPrevented;
        },
        preventDefault() {
            defaultPrevented = true;
        }
    };
};

const PopoverPrimitiveRootInner = forwardRef<HTMLDivElement, PopoverPrimitiveRootProps>(({
    children,
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    modal = false,
    openOnHover = false,
    hoverOpenDelay = 300,
    hoverCloseDelay = 0,
    handle, triggerId, defaultTriggerId,
    onOpenChangeComplete,
    actionsRef,
    ...props
}, ref) => {
    // onOpenChange is called by requestOpenChange (with details), not by the state hook.
    const [isOpen, setIsOpen] = useControllableState(controlledOpen, defaultOpen, noop);
    const onOpenChangeRef = React.useRef(onOpenChange);
    onOpenChangeRef.current = onOpenChange;
    const requestOpenChange = React.useCallback((nextOpen: boolean, reason: OpenChangeReason, event?: Event) => {
        const details = createOpenChangeDetails(reason, event);
        callOpenChange(onOpenChangeRef.current, nextOpen, details);
        if (details.isCanceled) return;
        setIsOpen(nextOpen);
        if (!nextOpen) handle?.close();
    }, [setIsOpen, handle]);
    usePopupActions(actionsRef, () => requestOpenChange(false, 'imperative-action'));
    useHandleTriggerId(handle, triggerId, defaultTriggerId, Boolean(isOpen));
    useRegisterDocumentOverlayOpen(isOpen);
    const [triggerNode, setTriggerNode] = React.useState<HTMLElement | null>(null);
    const [anchorNode, setAnchorNode] = React.useState<HTMLElement | null>(null);
    const [arrowNode, setArrowNode] = React.useState<SVGSVGElement | null>(null);
    const [positioning, setPositioningState] = React.useState(defaultPopoverPositioning);
    const [triggerHover, setTriggerHoverState] = React.useState<PopoverTriggerHover>({});
    const setTriggerHover = React.useCallback((next: PopoverTriggerHover) => {
        setTriggerHoverState(prev => (prev.openOnHover === next.openOnHover && prev.delay === next.delay && prev.closeDelay === next.closeDelay ? prev : next));
    }, []);
    const hoverEnabled = triggerHover.openOnHover ?? openOnHover;
    const hoverDelay = { open: triggerHover.delay ?? hoverOpenDelay, close: triggerHover.closeDelay ?? hoverCloseDelay };
    const stickyAlways = positioning.sticky === true || positioning.sticky === 'always';
    const contentEventHandlersRef = React.useRef<ContentEventHandlers>({});
    const nodeId = Floater.useFloatingNodeId();

    const placement = React.useMemo(
        () => getPlacement(positioning.side, positioning.align),
        [positioning.align, positioning.side]
    );

    const collisionBoundary = React.useMemo(() => {
        const boundary = Array.isArray(positioning.collisionBoundary)
            ? positioning.collisionBoundary
            : [positioning.collisionBoundary];

        return boundary.filter((item): item is Element => item != null);
    }, [positioning.collisionBoundary]);

    const detectOverflowOptions = React.useMemo(() => ({
        padding: positioning.collisionPadding,
        boundary: collisionBoundary,
        altBoundary: collisionBoundary.length > 0
    }), [collisionBoundary, positioning.collisionPadding]);

    // A handle lets triggers outside this Root open it; keep both in sync.
    const subscribeHandle = React.useCallback((listener: () => void) => handle?.subscribe(listener) ?? (() => {}), [handle]);
    const handleState = React.useSyncExternalStore(subscribeHandle, () => handle?.getState(), () => handle?.getState());
    const handleOpen = handleState?.open;
    const isOpenRef = React.useRef(isOpen);
    isOpenRef.current = isOpen;
    // Only follow changes of the handle, so `defaultOpen` isn't undone by a still-closed handle on mount.
    const lastHandleOpenRef = React.useRef(handleOpen);
    React.useEffect(() => {
        if (handleOpen === lastHandleOpenRef.current) return;
        lastHandleOpenRef.current = handleOpen;
        if (handleOpen === undefined || handleOpen === isOpenRef.current) return;
        // A detached trigger opened it (or the handle closed it): report it like any other change.
        const details = createOpenChangeDetails(handleOpen ? 'trigger-press' : 'imperative-action');
        callOpenChange(onOpenChangeRef.current, handleOpen, details);
        if (details.isCanceled) {
            if (handleOpen) handle?.close();
            return;
        }
        setIsOpen(handleOpen);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handleOpen]);
    const activeTrigger = handle ? handleState?.trigger ?? null : triggerNode;

    const referenceElement = anchorNode ?? activeTrigger;

    const { context: floatingContext, refs, floatingStyles, isPositioned } = Floater.useFloating({
        open: isOpen,
        nodeId,
        onOpenChange: (nextOpen, event, reason) => {
            if (!nextOpen && reason === 'escape-key' && event instanceof KeyboardEvent) {
                contentEventHandlersRef.current.onEscapeKeyDown?.(event);
                if (event.defaultPrevented) {
                    return;
                }
            }

            if (!nextOpen && reason === 'focus-out' && event instanceof FocusEvent) {
                const outsideEvent = createOutsideInteractionEvent(event);
                contentEventHandlersRef.current.onFocusOutside?.(outsideEvent);
                contentEventHandlersRef.current.onInteractOutside?.(outsideEvent);
                if (outsideEvent.defaultPrevented) {
                    return;
                }
            }

            requestOpenChange(nextOpen, fromFloatingReason(reason), event);
        },
        placement,
        strategy: positioning.positionMethod ?? 'fixed',
        elements: {
            reference: referenceElement
        },
        middleware: [
            Floater.offset({
                mainAxis: positioning.sideOffset + (arrowNode ? 5 : 0),
                crossAxis: positioning.alignOffset
            }),
            ...(positioning.collisionAvoidance
                ? collisionMiddleware({
                    avoidCollisions: positioning.avoidCollisions,
                    collisionAvoidance: positioning.collisionAvoidance,
                    padding: detectOverflowOptions.padding,
                    boundary: collisionBoundary,
                    sticky: stickyAlways,
                    aligned: placement.includes('-')
                })
                : []),
            positioning.avoidCollisions && !positioning.collisionAvoidance
                ? Floater.flip({
                    crossAxis: placement.includes('-'),
                    fallbackAxisSideDirection: 'start',
                    ...detectOverflowOptions
                })
                : null,
            positioning.avoidCollisions && !positioning.collisionAvoidance
                ? Floater.shift({
                    ...detectOverflowOptions,
                    limiter: stickyAlways ? undefined : Floater.limitShift()
                })
                : null,
            arrowNode
                ? Floater.arrow({
                    element: arrowNode,
                    padding: positioning.arrowPadding
                })
                : null,
            positioning.hideWhenDetached
                ? Floater.hide({ strategy: 'referenceHidden' })
                : null
        ].filter(Boolean),
        whileElementsMounted: anchorTracking(positioning.disableAnchorTracking)
    });
    useFloatingAnchor(positioning.anchor, refs.setPositionReference, isOpen);

    const click = Floater.useClick(floatingContext, {
        event: 'click',
        toggle: true
    });

    const hover = Floater.useHover(floatingContext, {
        enabled: hoverEnabled,
        delay: hoverDelay,
        // Lets the pointer travel from the trigger into the popover without it closing.
        handleClose: Floater.safePolygon()
    });

    const dismiss = Floater.useDismiss(floatingContext, {
        outsidePressEvent: 'pointerdown',
        outsidePress: (event) => {
            const outsideEvent = createOutsideInteractionEvent(event as PointerEvent);
            contentEventHandlersRef.current.onPointerDownOutside?.(outsideEvent);
            contentEventHandlersRef.current.onInteractOutside?.(outsideEvent);
            return !outsideEvent.defaultPrevented;
        }
    });

    const role = Floater.useRole(floatingContext, { role: 'dialog' });

    const { getReferenceProps, getFloatingProps } = Floater.useInteractions([
        click,
        hover,
        dismiss,
        role
    ]);

    const contentId = Floater.useId() ?? '';

    const setPositioning = React.useCallback((value: Partial<typeof defaultPopoverPositioning>) => {
        setPositioningState(prev => ({ ...prev, ...value }));
    }, []);

    const handleOpenChange = React.useCallback((nextOpen: boolean) => {
        requestOpenChange(nextOpen, nextOpen ? 'none' : 'close-press');
    }, [requestOpenChange]);

    const setContentEventHandlers = React.useCallback((handlers: typeof contentEventHandlersRef.current) => {
        contentEventHandlersRef.current = handlers;
    }, []);

    const contextValue = React.useMemo(() => ({
        isOpen,
        modal,
        contentId,
        triggerNode: activeTrigger,
        anchorNode,
        handleOpenChange,
        setTriggerNode,
        setAnchorNode,
        setArrowNode,
        positioning,
        setPositioning,
        setTriggerHover,
        getReferenceProps,
        getFloatingProps,
        setContentEventHandlers,
        refs,
        isPositioned,
        floatingStyles,
        floatingContext,
        onOpenChangeComplete
    }), [
        anchorNode,
        contentId,
        floatingContext,
        floatingStyles,
        getFloatingProps,
        getReferenceProps,
        handleOpenChange,
        isOpen,
        isPositioned,
        modal,
        onOpenChangeComplete,
        positioning,
        refs,
        setContentEventHandlers,
        setPositioning,
        activeTrigger
    ]);

    return (
        <PopoverPrimitiveContext.Provider value={contextValue}>
            <Floater.FloatingNode id={nodeId}>
                <Primitive.div ref={ref} {...stateData(isOpen ? 'open' : 'closed')} {...props}>
                    {typeof children === 'function' ? children({ payload: handleState?.payload }) : children}
                </Primitive.div>
            </Floater.FloatingNode>
        </PopoverPrimitiveContext.Provider>
    );
});

PopoverPrimitiveRootInner.displayName = `${COMPONENT_NAME}Inner`;

const PopoverPrimitiveRoot = forwardRef<HTMLDivElement, PopoverPrimitiveRootProps>((props, ref) => {
    const floatingTree = Floater.useFloatingTree();

    if (floatingTree) {
        return <PopoverPrimitiveRootInner ref={ref} {...props} />;
    }

    return (
        <Floater.FloatingTree>
            <PopoverPrimitiveRootInner ref={ref} {...props} />
        </Floater.FloatingTree>
    );
});

PopoverPrimitiveRoot.displayName = COMPONENT_NAME;

export default PopoverPrimitiveRoot;
