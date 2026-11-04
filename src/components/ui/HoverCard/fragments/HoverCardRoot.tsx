import React, { useRef, useEffect, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';

import HoverCardContext from '../contexts/HoverCardContext';
import Floater from '~/core/primitives/Floater';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import { useControllableState } from '~/core/hooks/useControllableState';
import clsx from 'clsx';
import useLayoutEffect from '~/core/hooks/useLayoutEffect';
import type { PopupHandle } from '~/core/utils/popupHandle';
import { hoverCardHandleControls } from '../contexts/hoverCardHandleControls';
import { anchorTracking, collisionMiddleware, ContentPositioning, samePositioning, toPlacement } from '~/core/utils/placement';
import { useFloatingAnchor } from '~/core/hooks/useFloatingAnchor';
import { callOpenChange, createOpenChangeDetails, fromFloatingReason, OpenChangeDetails, OpenChangeReason } from '~/core/utils/openChangeDetails';
import { usePopupActions, PopupActions } from '~/core/hooks/usePopupActions';
import { useHandleTriggerId } from '~/core/utils/popupHandle';

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
    /**
     * With `handle`: the DOM `id` of the detached trigger the popup belongs to while open.
     * It is anchored to that trigger and gets its payload, also when opened from code.
     */
    triggerId?: string | null;
    /** Uncontrolled `triggerId`: the trigger used when the popup opens without one (e.g. `defaultOpen`). */
    defaultTriggerId?: string | null;
    open?: boolean;
    defaultOpen?: boolean;
    /** Called with the next open state; a two-parameter handler also gets details (`reason`, `event`, `cancel()`). */
    onOpenChange?: (open: boolean, details: OpenChangeDetails) => void;
    customRootClass?: string;
    openDelay?: number;
    closeDelay?: number;
    collisionBoundary?: Element | null | Array<Element | null>;
    collisionPadding?: number;
    /** Called after the open or close animations finish (at once when there are none). */
    onOpenChangeComplete?: (open: boolean) => void;
    /** Ref with `close()`, to close the popup from code (reason `'imperative-action'`). */
    actionsRef?: React.Ref<PopupActions>;
};

const HoverCardRoot = forwardRef<HoverCardRootElement, HoverCardRootProps>(({ children, open: controlledOpen = undefined, defaultOpen = false, onOpenChange, customRootClass = '', className = '', openDelay = 100, closeDelay = 200, collisionBoundary = null, collisionPadding = 4, handle, triggerId, defaultTriggerId, onOpenChangeComplete, actionsRef, ...props }, ref) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
    const rootTriggerClass = useComponentClass(customRootClass, `${COMPONENT_NAME}-trigger`);
    const arrowRef = useRef<SVGSVGElement | null>(null);
    const ARROW_HEIGHT = 8;
    const SPACING_GAP = 2;
    const boundary = Array.isArray(collisionBoundary) ? collisionBoundary : [collisionBoundary];
    const filteredBoundary = boundary.filter((item): item is Element => item != null);

    const [open, setOpen] = useControllableState(controlledOpen, defaultOpen, () => {});
    const onOpenChangeRef = useRef(onOpenChange);
    onOpenChangeRef.current = onOpenChange;

    // `side`, `align` and offsets set on HoverCard.Content.
    const [positioning, setPositioningState] = React.useState<ContentPositioning>({});
    const setPositioning = React.useCallback((next: ContentPositioning) => {
        setPositioningState((current) => (samePositioning(current, next) ? current : next));
    }, []);

    // Timers capture stale closures, so read the latest open state from a ref
    // and skip no-op transitions (onOpenChange only fires on real changes).
    const openRef = useRef(open);
    openRef.current = open;

    const handleOpenChange = (newOpen: boolean, reason: OpenChangeReason = 'none', event?: Event) => {
        if (openRef.current === newOpen) return;
        const details = createOpenChangeDetails(reason, event);
        callOpenChange(onOpenChangeRef.current, newOpen, details);
        if (details.isCanceled) return;
        openRef.current = newOpen;
        setOpen(newOpen);
        // Closing by pointer-out, Escape or blur also closes the handle.
        if (!newOpen) handle?.close();
    };

    const { refs: floatingRefs, floatingStyles, context: floatingContext, placement: resolvedPlacement } = Floater.useFloating({
        open,
        onOpenChange: (nextOpen, event, reason) => handleOpenChange(nextOpen, fromFloatingReason(reason), event),
        placement: toPlacement(positioning.side ?? 'bottom', positioning.align),
        strategy: positioning.positionMethod ?? 'fixed',
        middleware: [
            Floater.arrow({
                element: arrowRef,
                padding: positioning.arrowPadding ?? 0
            }),
            Floater.offset({ mainAxis: positioning.sideOffset ?? ARROW_HEIGHT + SPACING_GAP, crossAxis: positioning.alignOffset ?? 0 }),
            ...collisionMiddleware({
                collisionAvoidance: positioning.collisionAvoidance,
                padding: collisionPadding,
                boundary: filteredBoundary,
                sticky: positioning.sticky,
                aligned: Boolean(positioning.align && positioning.align !== 'center')
            })
        ],
        whileElementsMounted: anchorTracking(positioning.disableAnchorTracking)
    });
    useFloatingAnchor(positioning.anchor, floatingRefs.setPositionReference, open);

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
    // `delay` overrides the Root's openDelay (a trigger's own `delay`).
    const openWithDelay = (target?: { trigger: HTMLElement; payload: unknown }, event?: Event, delay = openDelay) => {
        mouseIsExitingRef.current = false;
        clearTimers();
        const reason: OpenChangeReason = event?.type === 'focus' || event?.type === 'focusin' ? 'trigger-focus' : 'trigger-hover';

        const commitOpen = () => {
            if (target && handle) handle.open(target.payload, target.trigger);
            handleOpenChange(true, reason, event);
        };

        if (delay <= 0) {
            commitOpen();
            return;
        }

        openTimeoutRef.current = setTimeout(() => {
            openTimeoutRef.current = null;
            commitOpen();
        }, delay) as unknown as number;
    };

    const closeWithDelay = (event?: Event, delay = closeDelay) => {
        mouseIsExitingRef.current = true;
        // A pending open must not fire after the pointer/focus has already left.
        clearTimers();
        const reason: OpenChangeReason = event?.type === 'blur' || event?.type === 'focusout' ? 'focus-out' : 'trigger-hover';

        if (delay <= 0) {
            handleOpenChange(false, reason, event);
            return;
        }

        closeTimeoutRef.current = setTimeout(() => {
            closeTimeoutRef.current = null;
            if (mouseIsExitingRef.current) {
                handleOpenChange(false, reason, event);
            }
        }, delay) as unknown as number;
    };

    const closeWithoutDelay = () => {
        clearTimers();
        handleOpenChange(false, 'none');
    };
    usePopupActions(actionsRef, () => { clearTimers(); handleOpenChange(false, 'imperative-action'); });
    useHandleTriggerId(handle, triggerId, defaultTriggerId, Boolean(open));

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
            openWithDelay: (target, event, delay) => controlsRef.current.openWithDelay(target, event, delay),
            closeWithDelay: (event, delay) => controlsRef.current.closeWithDelay(event, delay)
        });
        return () => {
            hoverCardHandleControls.delete(handle);
        };
    }, [handle]);

    const sendValues = {
        onOpenChangeComplete,
        setPositioning,
        resolvedPlacement,
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
        openWithDelay: (event?: Event, delay?: number) => openWithDelay(undefined, event, delay)
    };

    return <HoverCardContext.Provider value={sendValues}>
        <div ref={ref} className={clsx(rootClass && `${rootClass}-root`, className)} data-slot="hover-card-root" {...props}>
            {typeof children === 'function' ? children({ payload: handleState?.payload }) : children}
        </div>
    </HoverCardContext.Provider>;
});

HoverCardRoot.displayName = COMPONENT_NAME;

export default HoverCardRoot;
