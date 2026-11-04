import React, { useContext, useRef } from 'react';
import useLayoutEffect from '~/core/hooks/useLayoutEffect';
import type { PopupHandle } from '~/core/utils/popupHandle';
import { tooltipHandleIds } from '../context/tooltipHandleIds';
import { anchorTracking, collisionMiddleware, ContentPositioning, samePositioning, toPlacement } from '~/core/utils/placement';
import { useFloatingAnchor } from '~/core/hooks/useFloatingAnchor';

import TooltipContext from '../context/TooltipContext';
import { useFloating, offset, useHover, useFocus, useDismiss, useRole, useInteractions, arrow, safePolygon, useDelayGroup, useClientPoint } from '@floating-ui/react';
import TooltipProviderContext from '../context/TooltipProviderContext';
import { useControllableState } from '~/core/hooks/useControllableState';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import { callOpenChange, createOpenChangeDetails, fromFloatingReason, OpenChangeDetails, OpenChangeReason } from '~/core/utils/openChangeDetails';

const noop = () => {};

const COMPONENT_NAME = 'Tooltip';

type Placement =
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'left-start'
    | 'left-end'
    | 'right-start'
    | 'right-end';

export type TooltipRootElement = React.ElementRef<'div'>;

export interface TooltipRootProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
    /** Content, or a function of the hovered trigger's payload (with `handle`). */
    children: React.ReactNode | ((state: { payload: unknown }) => React.ReactNode);
    /** Where the tooltip sits. `side`/`align` on `Tooltip.Content` take precedence. */
    placement?: Placement;
    collisionBoundary?: Element | null | Array<Element | null>;
    collisionPadding?: number;
    /** Controlled open state. */
    open?: boolean;
    /** Initial open state when uncontrolled. */
    defaultOpen?: boolean;
    /** Called with the next open state; a two-parameter handler also gets details (`reason`, `event`, `cancel()`). */
    onOpenChange?: (open: boolean, details: OpenChangeDetails) => void;
    /**
     * Delay in ms before the tooltip opens on hover. Focus opens immediately.
     * Defaults to the `Tooltip.Provider` delay, or 0 outside a provider.
     */
    openDelay?: number;
    /**
     * Delay in ms before the tooltip closes after the pointer leaves.
     * Defaults to the `Tooltip.Provider` delay, or 0 outside a provider.
     */
    closeDelay?: number;
    customRootClass?: string;
    /**
     * Connects triggers rendered anywhere, made with `Tooltip.createHandle()`.
     * The tooltip anchors to whichever is hovered or focused, and its children
     * can be a function of that trigger's payload.
     */
    handle?: PopupHandle<any>;
    /**
     * Follow the pointer along this axis while it's over the trigger, instead of anchoring
     * to the trigger. The tooltip then closes as soon as the pointer leaves the trigger.
     */
    trackCursorAxis?: 'none' | 'x' | 'y' | 'both';
    /** Called after the open or close animations finish (at once when there are none). */
    onOpenChangeComplete?: (open: boolean) => void;
    /** Never open the tooltip, and close it if it is open. */
    disabled?: boolean;
    /**
     * Close as soon as the pointer leaves the trigger, instead of letting it move onto the
     * tooltip. Use for tooltips with nothing to read or select.
     */
    disableHoverablePopup?: boolean;
}

const TooltipRoot = React.forwardRef<TooltipRootElement, TooltipRootProps>(
    ({
        children,
        placement = 'top',
        collisionBoundary = null,
        collisionPadding = 5,
        open,
        defaultOpen = false,
        onOpenChange,
        openDelay,
        closeDelay,
        customRootClass = '',
        handle,
        trackCursorAxis = 'none',
        onOpenChangeComplete,
        disabled = false,
        disableHoverablePopup = false,
        ...props
    }, ref) => {
        const arrowRef = useRef<SVGSVGElement>(null);
        const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);

        const [isOpen, setOpenState] = useControllableState(open, defaultOpen, noop);
        const isOpenRef = useRef(isOpen);
        isOpenRef.current = isOpen;
        // Set by Tooltip.Trigger: a disabled trigger doesn't open the tooltip.
        const triggerDisabledRef = useRef(false);
        // onOpenChange is called here with details; the state hook only stores the value.
        const onOpenChangeRef = React.useRef(onOpenChange);
        onOpenChangeRef.current = onOpenChange;
        const setIsOpen = React.useCallback((nextOpen: boolean, reason: OpenChangeReason = 'none', event?: Event) => {
            const details = createOpenChangeDetails(reason, event);
            callOpenChange(onOpenChangeRef.current, nextOpen, details);
            if (details.isCanceled) return;
            setOpenState(nextOpen);
        }, [setOpenState]);

        // `side`, `align` and offsets set on Tooltip.Content.
        const [positioning, setPositioningState] = React.useState<ContentPositioning>({});
        const setPositioning = React.useCallback((next: ContentPositioning) => {
            setPositioningState((current) => (samePositioning(current, next) ? current : next));
        }, []);
        const resolvedPlacement = positioning.side || positioning.align
            ? toPlacement(positioning.side ?? 'top', positioning.align)
            : placement;

        const boundary = Array.isArray(collisionBoundary) ? collisionBoundary : [collisionBoundary];
        const filteredBoundary = boundary.filter((item): item is Element => item != null);

        const data = useFloating({
            // The open state must be passed in, otherwise dismiss (Escape),
            // useRole (aria-describedby) and hover-close logic never see it.
            open: isOpen,
            placement: resolvedPlacement,
            strategy: positioning.positionMethod ?? 'fixed',
            onOpenChange: (nextOpen, event, reason) => {
                if (nextOpen && (disabled || triggerDisabledRef.current)) return;
                setIsOpen(nextOpen, fromFloatingReason(reason), event);
                // Closing by hover-out, Escape or blur also closes the handle.
                if (!nextOpen) handle?.close();
            },
            middleware: [
                arrow({
                    element: arrowRef,
                    padding: positioning.arrowPadding ?? 4
                }),
                offset({ mainAxis: positioning.sideOffset ?? 5, crossAxis: positioning.alignOffset ?? 0 }),
                ...collisionMiddleware({
                    collisionAvoidance: positioning.collisionAvoidance,
                    padding: collisionPadding,
                    boundary: filteredBoundary,
                    sticky: positioning.sticky
                })
            ],
            whileElementsMounted: anchorTracking(positioning.disableAnchorTracking)
        });

        // `anchor` on Tooltip.Content positions against something other than the trigger.
        useFloatingAnchor(positioning.anchor, data.refs.setPositionReference, isOpen);

        // Turning `disabled` on closes an open tooltip.
        useLayoutEffect(() => {
            if (disabled && isOpenRef.current) setIsOpen(false, 'none');
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [disabled]);

        const context = data.context;

        const provider = useContext(TooltipProviderContext);
        // Outside a provider this returns a no-op group, so the explicit props
        // (or 0) always apply.
        const group = useDelayGroup(context, { id: context.floatingId, enabled: Boolean(provider) });
        const groupDelay = typeof group.delay === 'number'
            ? { open: group.delay, close: group.delay }
            : group.delay;
        const delay = {
            open: openDelay ?? (provider ? groupDelay.open ?? provider.openDelay : 0),
            close: closeDelay ?? (provider ? groupDelay.close ?? provider.closeDelay : 0)
        };
        const isInstantPhase = Boolean(provider) && group.isInstantPhase;

        // A handle lets detached triggers open this tooltip and anchor it.
        const subscribeHandle = React.useCallback((listener: () => void) => handle?.subscribe(listener) ?? (() => {}), [handle]);
        const handleState = React.useSyncExternalStore(subscribeHandle, () => handle?.getState(), () => handle?.getState());
        const handleOpen = handleState?.open;
        const handleTrigger = handleState?.trigger ?? null;
        const setReference = data.refs.setReference;
        useLayoutEffect(() => {
            if (!handle) return;
            if (handleTrigger) setReference(handleTrigger);
            if (handleOpen !== undefined && handleOpen !== isOpenRef.current) setIsOpen(handleOpen);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [handle, handleOpen, handleTrigger, setReference]);
        if (handle && context.floatingId) tooltipHandleIds.set(handle, context.floatingId);
        const tracksCursor = trackCursorAxis !== 'none';

        const hover = useHover(context, {
            enabled: !disabled,
            move: false,
            delay,
            // Lets the pointer travel from the trigger onto the tooltip without
            // it closing (WCAG 1.4.13 "hoverable"). A tooltip that follows the
            // pointer can't be reached, so it closes when the pointer leaves.
            handleClose: tracksCursor || disableHoverablePopup ? null : safePolygon()
        });

        const clientPoint = useClientPoint(context, {
            enabled: tracksCursor,
            axis: tracksCursor ? trackCursorAxis : 'both'
        });

        const focus = useFocus(context, { enabled: !disabled });

        const dismiss = useDismiss(context);

        const role = useRole(context, { role: 'tooltip' });

        const interactions = useInteractions([
            hover,
            clientPoint,
            focus,
            dismiss,
            role
        ]);

        return (
            <TooltipContext.Provider value={{ isOpen, setIsOpen, data, interactions, context, arrowRef, rootClass, isInstantPhase, onOpenChangeComplete, setPositioning, disabled, triggerDisabledRef }}>
                <div ref={ref} data-slot="tooltip-root" {...props}>
                    {typeof children === 'function' ? (children as (state: { payload: unknown }) => React.ReactNode)({ payload: handleState?.payload }) : children}
                </div>
            </TooltipContext.Provider>
        );
    }
);

TooltipRoot.displayName = COMPONENT_NAME;

export default TooltipRoot;
