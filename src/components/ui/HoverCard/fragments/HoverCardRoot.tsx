import React, { useRef, useEffect, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';

import HoverCardContext from '../contexts/HoverCardContext';
import Floater from '~/core/primitives/Floater';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import { useControllableState } from '~/core/hooks/useControllableState';
import clsx from 'clsx';
import useLayoutEffect from '~/core/hooks/useLayoutEffect';
import type { PopupHandle } from '~/core/utils/popupHandle';
import { hoverCardHandleControls } from '../contexts/hoverCardHandleControls';

const COMPONENT_NAME = 'HoverCard';

export type HoverCardRootElement = ElementRef<'div'>;
export type HoverCardRootProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
    /** Content, or a function of the hovered trigger's payload (with `handle`). */
    children?: React.ReactNode | ((state: { payload: unknown }) => React.ReactNode);
    /**
     * Connects triggers rendered anywhere, made with `HoverCard.createHandle()`.
     * The card anchors to whichever is hovered or focused, and its children can
     * be a function of that trigger's payload.
     */
    handle?: PopupHandle<any>;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    customRootClass?: string;
    openDelay?: number;
    closeDelay?: number;
    collisionBoundary?: Element | null | Array<Element | null>;
    collisionPadding?: number;
    /** Called after the open or close animations finish (at once when there are none). */
    onOpenChangeComplete?: (open: boolean) => void;
};

const HoverCardRoot = forwardRef<HoverCardRootElement, HoverCardRootProps>(({ children, open: controlledOpen = undefined, defaultOpen = false, onOpenChange, customRootClass = '', className = '', openDelay = 100, closeDelay = 200, collisionBoundary = null, collisionPadding = 4, handle, onOpenChangeComplete, ...props }, ref) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
    const rootTriggerClass = useComponentClass(customRootClass, `${COMPONENT_NAME}-trigger`);
    const arrowRef = useRef<SVGSVGElement | null>(null);
    const ARROW_HEIGHT = 8;
    const SPACING_GAP = 2;
    const boundary = Array.isArray(collisionBoundary) ? collisionBoundary : [collisionBoundary];
    const filteredBoundary = boundary.filter((item): item is Element => item != null);
    const detectOverflowOptions = {
        padding: collisionPadding,
        boundary: filteredBoundary,
        altBoundary: filteredBoundary.length > 0
    };

    const [open, setOpen] = useControllableState(controlledOpen, defaultOpen, onOpenChange);

    // Timers capture stale closures, so read the latest open state from a ref
    // and skip no-op transitions (onOpenChange only fires on real changes).
    const openRef = useRef(open);
    openRef.current = open;

    const handleOpenChange = (newOpen: boolean) => {
        if (openRef.current === newOpen) return;
        openRef.current = newOpen;
        setOpen(newOpen);
        // Closing by pointer-out, Escape or blur also closes the handle.
        if (!newOpen) handle?.close();
    };

    const { refs: floatingRefs, floatingStyles, context: floatingContext } = Floater.useFloating({
        open,
        onOpenChange: handleOpenChange,
        placement: 'bottom',
        strategy: 'fixed',
        middleware: [
            Floater.arrow({
                element: arrowRef
            }),
            Floater.offset(ARROW_HEIGHT + SPACING_GAP),
            Floater.flip({
                mainAxis: true,
                ...detectOverflowOptions
            }),
            Floater.shift({
                ...detectOverflowOptions
            })
        ],
        whileElementsMounted: Floater.autoUpdate
    });

    // When the pointer leaves the trigger/content, delay closing and confirm
    // the pointer has not re-entered before committing the state change.
    const mouseIsExitingRef = useRef(false);
    const openTimeoutRef = useRef<number | null>(null);
    const closeTimeoutRef = useRef<number | null>(null);

    const role = Floater.useRole(floatingContext, { role: 'dialog' });
    const dismiss = Floater.useDismiss(floatingContext);

    // The trigger is a non-interactive wrapper (usually around a link), so it
    // only receives the dismiss handlers; aria-expanded/aria-haspopup are not
    // valid on it. The content keeps its dialog role.
    const { getReferenceProps } = Floater.useInteractions([dismiss]);
    const { getFloatingProps } = Floater.useInteractions([role, dismiss]);

    const clearTimers = () => {
        if (openTimeoutRef.current) {
            clearTimeout(openTimeoutRef.current);
            openTimeoutRef.current = null;
        }
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
    };

    // `target` comes from a detached trigger: anchor to it and pass its payload once the delay ends.
    const openWithDelay = (target?: { trigger: HTMLElement; payload: unknown }) => {
        mouseIsExitingRef.current = false;
        clearTimers();

        const commitOpen = () => {
            if (target && handle) handle.open(target.payload, target.trigger);
            handleOpenChange(true);
        };

        if (openDelay <= 0) {
            commitOpen();
            return;
        }

        openTimeoutRef.current = setTimeout(() => {
            openTimeoutRef.current = null;
            commitOpen();
        }, openDelay) as unknown as number;
    };

    const closeWithDelay = () => {
        mouseIsExitingRef.current = true;
        // A pending open must not fire after the pointer/focus has already left.
        clearTimers();

        if (closeDelay <= 0) {
            handleOpenChange(false);
            return;
        }

        closeTimeoutRef.current = setTimeout(() => {
            closeTimeoutRef.current = null;
            if (mouseIsExitingRef.current) {
                handleOpenChange(false);
            }
        }, closeDelay) as unknown as number;
    };

    const closeWithoutDelay = () => {
        clearTimers();
        handleOpenChange(false);
    };

    useEffect(() => clearTimers, []);

    // A handle lets detached triggers open this card and anchor it.
    const subscribeHandle = React.useCallback((listener: () => void) => handle?.subscribe(listener) ?? (() => {}), [handle]);
    const handleState = React.useSyncExternalStore(subscribeHandle, () => handle?.getState(), () => handle?.getState());
    const handleOpen = handleState?.open;
    const handleTrigger = handleState?.trigger ?? null;
    const setReference = floatingRefs.setReference;
    useLayoutEffect(() => {
        if (!handle) return;
        if (handleTrigger) setReference(handleTrigger);
        if (handleOpen !== undefined && handleOpen !== openRef.current) {
            openRef.current = handleOpen;
            setOpen(handleOpen);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handle, handleOpen, handleTrigger, setReference]);

    const controlsRef = useRef({ openWithDelay, closeWithDelay });
    controlsRef.current = { openWithDelay, closeWithDelay };
    useEffect(() => {
        if (!handle) return;
        hoverCardHandleControls.set(handle, {
            openWithDelay: (target) => controlsRef.current.openWithDelay(target),
            closeWithDelay: () => controlsRef.current.closeWithDelay()
        });
        return () => {
            hoverCardHandleControls.delete(handle);
        };
    }, [handle]);

    const sendValues = {
        onOpenChangeComplete,
        isOpen: open,
        handleOpenChange,
        floatingRefs,
        floatingStyles,
        floatingContext,
        arrowRef,
        getReferenceProps,
        getFloatingProps,
        rootClass,
        rootTriggerClass,
        closeWithDelay,
        closeWithoutDelay,
        // Parts pass this straight to event props; drop the event so it is never read as a target.
        openWithDelay: () => openWithDelay()
    };

    return <HoverCardContext.Provider value={sendValues}>
        <div ref={ref} className={clsx(rootClass && `${rootClass}-root`, className)} data-slot="hover-card-root" {...props}>
            {typeof children === 'function' ? children({ payload: handleState?.payload }) : children}
        </div>
    </HoverCardContext.Provider>;
});

HoverCardRoot.displayName = COMPONENT_NAME;

export default HoverCardRoot;
