'use client';

import React, { forwardRef, useContext } from 'react';
import ButtonPrimitive from '~/core/primitives/Button';
import { PopoverPrimitiveContext } from '../context/PopoverPrimitiveContext';
import Floater from '~/core/primitives/Floater';
import type { PopupHandle } from '~/core/utils/popupHandle';

export type PopoverPrimitiveTriggerProps = React.ComponentPropsWithoutRef<typeof ButtonPrimitive> & {
    asChild?: boolean;
    disabled?: boolean;
    /** Open the popover connected to this handle, even when rendered outside its Root. */
    handle?: PopupHandle<any>;
    /** Data for the popover's content, such as the item this trigger belongs to. */
    payload?: unknown;
};

const PopoverPrimitiveTrigger = forwardRef<HTMLButtonElement, PopoverPrimitiveTriggerProps>(({
    children,
    asChild = false,
    disabled = false,
    onClick,
    handle,
    payload,
    ...props
}, ref) => {
    const { isOpen, contentId, getReferenceProps, setTriggerNode } = useContext(PopoverPrimitiveContext);
    const subscribeHandle = React.useCallback((listener: () => void) => handle?.subscribe(listener) ?? (() => {}), [handle]);
    const handleState = React.useSyncExternalStore(subscribeHandle, () => handle?.getState(), () => handle?.getState());
    const triggerRef = React.useRef<HTMLButtonElement | null>(null);

    const mergedRef = Floater.useMergeRefs([
        ref,
        triggerRef,
        (node: HTMLElement | null) => {
            if (!handle) setTriggerNode(node);
        }
    ]);

    if (handle) {
        // A detached trigger is open only when it's the one that opened the popover.
        const open = Boolean(handleState?.open && handleState.trigger === triggerRef.current);
        return (
            <ButtonPrimitive
                ref={mergedRef}
                asChild={asChild}
                disabled={disabled}
                aria-haspopup="dialog"
                aria-expanded={open}
                data-state={open ? 'open' : 'closed'}
                data-disabled={disabled ? '' : undefined}
                {...props}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    onClick?.(event);
                    if (event.defaultPrevented || disabled) return;
                    if (open) handle.close();
                    else handle.open(payload, event.currentTarget);
                }}
            >
                {children}
            </ButtonPrimitive>
        );
    }

    return (
        <ButtonPrimitive
            ref={mergedRef}
            asChild={asChild}
            disabled={disabled}
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            aria-controls={contentId || undefined}
            data-state={isOpen ? 'open' : 'closed'}
            data-disabled={disabled ? '' : undefined}
            {...getReferenceProps({
                ...props,
                disabled,
                onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
                    onClick?.(event);
                }
            })}
        >
            {children}
        </ButtonPrimitive>
    );
});

PopoverPrimitiveTrigger.displayName = 'PopoverPrimitiveTrigger';

export default PopoverPrimitiveTrigger;
