'use client';

import React, { forwardRef } from 'react';
import Floater from '~/core/primitives/Floater';
import Primitive from '~/core/primitives/Primitive';
import { useControllableState } from '~/core/hooks/useControllableState';
import { useRegisterDocumentOverlayOpen } from '~/core/hooks/useRegisterDocumentOverlayOpen';
import {
    defaultPopoverPositioning,
    PopoverPrimitiveContext
} from '../context/PopoverPrimitiveContext';
import type { PopupHandle } from '~/core/utils/popupHandle';

export type PopoverPrimitiveRootProps = Omit<React.ComponentPropsWithoutRef<typeof Primitive.div>, 'children'> & {
    /** Content, or a function of the payload passed by the trigger that opened it (with `handle`). */
    children: React.ReactNode | ((state: { payload: unknown }) => React.ReactNode);
    /** Connects detached triggers made with `createHandle()`; the popover anchors to whichever opened it. */
    handle?: PopupHandle<any>;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    modal?: boolean;
    /** Also open while the pointer rests on the trigger, like a hover card. Clicking still toggles. */
    openOnHover?: boolean;
    /** With `openOnHover`, ms the pointer must rest before opening. */
    hoverOpenDelay?: number;
    /** With `openOnHover`, ms after the pointer leaves before closing. */
    hoverCloseDelay?: number;
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
    handle,
    ...props
}, ref) => {
    const [isOpen, setIsOpen] = useControllableState(controlledOpen, defaultOpen, onOpenChange);
    useRegisterDocumentOverlayOpen(isOpen);
    const [triggerNode, setTriggerNode] = React.useState<HTMLElement | null>(null);
    const [anchorNode, setAnchorNode] = React.useState<HTMLElement | null>(null);
    const [arrowNode, setArrowNode] = React.useState<SVGSVGElement | null>(null);
    const [positioning, setPositioningState] = React.useState(defaultPopoverPositioning);
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
    React.useEffect(() => {
        if (handleOpen === undefined) return;
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

            setIsOpen(nextOpen);
            if (!nextOpen) handle?.close();
        },
        placement,
        strategy: 'fixed',
        elements: {
            reference: referenceElement
        },
        middleware: [
            Floater.offset({
                mainAxis: positioning.sideOffset + (arrowNode ? 5 : 0),
                crossAxis: positioning.alignOffset
            }),
            positioning.avoidCollisions
                ? Floater.flip({
                    crossAxis: placement.includes('-'),
                    fallbackAxisSideDirection: 'start',
                    ...detectOverflowOptions
                })
                : null,
            positioning.avoidCollisions
                ? Floater.shift({
                    ...detectOverflowOptions,
                    limiter: positioning.sticky === 'partial' ? Floater.limitShift() : undefined
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
        whileElementsMounted: Floater.autoUpdate
    });

    const click = Floater.useClick(floatingContext, {
        event: 'click',
        toggle: true
    });

    const hover = Floater.useHover(floatingContext, {
        enabled: openOnHover,
        delay: { open: hoverOpenDelay, close: hoverCloseDelay },
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
        setIsOpen(nextOpen);
        if (!nextOpen) handle?.close();
    }, [setIsOpen, handle]);

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
        getReferenceProps,
        getFloatingProps,
        setContentEventHandlers,
        refs,
        isPositioned,
        floatingStyles,
        floatingContext
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
        positioning,
        refs,
        setContentEventHandlers,
        setPositioning,
        activeTrigger
    ]);

    return (
        <PopoverPrimitiveContext.Provider value={contextValue}>
            <Floater.FloatingNode id={nodeId}>
                <Primitive.div ref={ref} data-state={isOpen ? 'open' : 'closed'} {...props}>
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
