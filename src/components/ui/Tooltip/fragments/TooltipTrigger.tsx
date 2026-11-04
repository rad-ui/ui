import React, { useContext } from 'react';

import TooltipContext from '../context/TooltipContext';
import ButtonPrimitive from '~/core/primitives/Button';
import { useMergeRefs } from '@floating-ui/react';
import { getElementRef } from '~/core/utils/mergeProps';
import type { PopupHandle } from '~/core/utils/popupHandle';
import { tooltipHandleIds } from '../context/tooltipHandleIds';
import { stateData } from '~/core/utils/stateAttributes';

export type TooltipTriggerElement = React.ElementRef<typeof ButtonPrimitive>;

export type TooltipTriggerProps = React.ComponentPropsWithoutRef<typeof ButtonPrimitive> & {
    asChild?: boolean;
    children: React.ReactNode;
    /** Open the tooltip connected to this handle, even when rendered outside its Root. */
    handle?: PopupHandle<any>;
    /** Data for the tooltip's content, such as the cell this trigger belongs to. */
    payload?: unknown;
    /** With `handle`, ms the pointer rests before opening. Focus opens immediately. */
    delay?: number;
    /** Close the tooltip when the trigger is clicked. Defaults to true. */
    closeOnClick?: boolean;
};

const TooltipTrigger = React.forwardRef<TooltipTriggerElement, TooltipTriggerProps>(
    ({ children, asChild, handle, payload, delay = 0, closeOnClick = true, ...props }, ref) => {
        const tooltipContext = useContext(TooltipContext);
        const subscribeHandle = React.useCallback((listener: () => void) => handle?.subscribe(listener) ?? (() => {}), [handle]);
        const handleState = React.useSyncExternalStore(subscribeHandle, () => handle?.getState(), () => handle?.getState());
        const triggerRef = React.useRef<HTMLButtonElement | null>(null);
        const openTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
        const childrenRef = getElementRef(children);
        const detachedRef = useMergeRefs([ref, triggerRef, childrenRef]);
        // Hooks run before the detached/attached split so their order never changes.
        const mergedRef = useMergeRefs([tooltipContext?.context.refs.setReference, ref, childrenRef]);
        React.useEffect(() => () => {
            if (openTimerRef.current) clearTimeout(openTimerRef.current);
        }, []);

        if (handle) {
            // Detached: open the shared tooltip on hover or focus; the Root closes it.
            const active = Boolean(handleState?.open && handleState.trigger === triggerRef.current);
            const clearTimer = () => {
                if (openTimerRef.current) clearTimeout(openTimerRef.current);
                openTimerRef.current = null;
            };
            const { onMouseEnter, onMouseLeave, onFocus, onBlur, onClick, ...rest } = props as React.ComponentPropsWithoutRef<'button'>;
            const opensTooltip = !rest.disabled;
            return (
                <ButtonPrimitive
                    asChild={asChild}
                    ref={detachedRef}
                    data-slot="tooltip-trigger"
                    {...stateData(active ? 'open' : 'closed')}
                    aria-describedby={active ? tooltipHandleIds.get(handle) : undefined}
                    {...rest}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        onClick?.(event);
                        if (closeOnClick && handle.getState().trigger === event.currentTarget) handle.close();
                    }}
                    onMouseEnter={(event: React.MouseEvent<HTMLButtonElement>) => {
                        onMouseEnter?.(event);
                        clearTimer();
                        if (!opensTooltip) return;
                        const target = event.currentTarget;
                        if (delay <= 0) handle.open(payload, target);
                        else openTimerRef.current = setTimeout(() => handle.open(payload, target), delay);
                    }}
                    onMouseLeave={(event: React.MouseEvent<HTMLButtonElement>) => {
                        onMouseLeave?.(event);
                        clearTimer();
                    }}
                    onFocus={(event: React.FocusEvent<HTMLButtonElement>) => {
                        onFocus?.(event);
                        if (opensTooltip) handle.open(payload, event.currentTarget);
                    }}
                    onBlur={(event: React.FocusEvent<HTMLButtonElement>) => {
                        onBlur?.(event);
                        clearTimer();
                        if (handle.getState().trigger === event.currentTarget) handle.close();
                    }}
                >
                    {children}
                </ButtonPrimitive>
            );
        }

        if (!tooltipContext) {
            throw new Error('TooltipTrigger must be used within a TooltipRoot component');
        }

        const { isOpen, interactions, setIsOpen } = tooltipContext;

        const { getReferenceProps } = interactions;
        const { onClick, ...restProps } = props as React.ComponentPropsWithoutRef<'button'>;
        // A disabled trigger doesn't open the tooltip.
        if (tooltipContext.triggerDisabledRef) tooltipContext.triggerDisabledRef.current = Boolean(restProps.disabled);
        const triggerProps = getReferenceProps(restProps);

        return (
            <ButtonPrimitive
                asChild={asChild}
                ref={mergedRef}
                data-slot="tooltip-trigger"
                {...stateData(isOpen ? 'open' : 'closed')}
                {...triggerProps}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    onClick?.(event);
                    if (closeOnClick && isOpen) setIsOpen(false, 'trigger-press', event.nativeEvent);
                }}
            >
                {children}
            </ButtonPrimitive>
        );
    }
);

TooltipTrigger.displayName = 'TooltipTrigger';

export default TooltipTrigger;
