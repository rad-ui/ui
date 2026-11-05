'use client';
import React, { forwardRef, useContext } from 'react';
import ButtonPrimitive from '~/core/primitives/Button';
import { DialogPrimitiveContext } from '../context/DialogPrimitiveContext';
import Floater from '~/core/primitives/Floater';
import type { DialogHandle } from '../handle';
import { stateData } from '~/core/utils/stateAttributes';
import { useHandleTriggerRegistration } from '~/core/utils/popupHandle';

export type DialogPrimitiveTriggerProps = {
    children?: React.ReactNode;
    asChild?: boolean;
    className?: string;
    disabled?: boolean;
    /** Open the dialog connected to this handle, even when rendered outside its Root. */
    handle?: DialogHandle<any>;
    /** Data for the dialog's content, such as the row this trigger belongs to. */
    payload?: unknown;
}

const DialogPrimitiveTrigger = forwardRef<HTMLButtonElement, DialogPrimitiveTriggerProps>(({
    children,
    asChild,
    className = '',
    disabled = false,
    handle,
    payload,
    ...props
}, ref) => {
    const { isOpen, handleOpenChange, getReferenceProps, refs } = useContext(DialogPrimitiveContext);
    const { onClick, ...restProps } = props as React.ComponentPropsWithoutRef<'button'>;

    const subscribeHandle = React.useCallback((listener: () => void) => handle?.subscribe(listener) ?? (() => {}), [handle]);
    const handleState = React.useSyncExternalStore(subscribeHandle, () => handle?.getState(), () => handle?.getState());
    const triggerRef = React.useRef<HTMLButtonElement | null>(null);
    // Lets the Root's `triggerId` find this trigger.
    useHandleTriggerRegistration(handle, triggerRef, payload);
    // A detached trigger is open only when it's the one that opened the dialog.
    const triggerOpen = handle ? Boolean(handleState?.open && handleState.trigger === triggerRef.current) : isOpen;

    const mergedRef = Floater.useMergeRefs(handle ? [triggerRef, ref] : [refs.setReference, triggerRef, ref]);
    const dataState = triggerOpen ? 'open' : 'closed';
    const referenceProps = handle
        ? (userProps: Record<string, unknown>) => ({ 'aria-haspopup': 'dialog' as const, ...userProps })
        : getReferenceProps as (userProps?: Record<string, unknown>) => Record<string, unknown>;
    const dataDisabled = disabled ? '' : undefined;

    return (
        <ButtonPrimitive
            ref={mergedRef}
            asChild={asChild}
            className={className}
            {...referenceProps({
                ...restProps,
                disabled,
                'aria-expanded': triggerOpen,
                ...stateData(dataState),
                'data-disabled': dataDisabled,
                onClick(event: React.MouseEvent<HTMLButtonElement>) {
                    if (disabled) return;
                    onClick?.(event);
                    if (event.defaultPrevented) return;
                    if (handle) handle.open(payload, event.currentTarget);
                    else handleOpenChange(true, 'trigger-press', event.nativeEvent);
                }
            })}
        >
            {children}
        </ButtonPrimitive>
    );
});

DialogPrimitiveTrigger.displayName = 'DialogPrimitiveTrigger';

export default DialogPrimitiveTrigger;
