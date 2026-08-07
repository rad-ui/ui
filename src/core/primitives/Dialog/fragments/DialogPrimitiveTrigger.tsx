'use client';
import React, { forwardRef, useContext } from 'react';
import ButtonPrimitive from '~/core/primitives/Button';
import { DialogPrimitiveContext } from '../context/DialogPrimitiveContext';
import Floater from '~/core/primitives/Floater';

export type DialogPrimitiveTriggerProps = {
    children: React.ReactNode;
    asChild?: boolean;
    className?: string;
    disabled?: boolean;
}

const DialogPrimitiveTrigger = forwardRef<HTMLButtonElement, DialogPrimitiveTriggerProps>(({
    children,
    asChild,
    className = '',
    disabled = false,
    ...props
}, ref) => {
    const { isOpen, handleOpenChange, getReferenceProps, refs } = useContext(DialogPrimitiveContext);
    const { onClick, ...restProps } = props as React.ComponentPropsWithoutRef<'button'>;

    const mergedRef = Floater.useMergeRefs([refs.setReference, ref]);
    const dataState = isOpen ? 'open' : 'closed';
    const dataDisabled = disabled ? '' : undefined;

    return (
        <ButtonPrimitive
            ref={mergedRef}
            asChild={asChild}
            className={className}
            {...(getReferenceProps as (userProps?: Record<string, unknown>) => Record<string, unknown>)({
                ...restProps,
                disabled,
                'aria-expanded': isOpen,
                'data-state': dataState,
                'data-disabled': dataDisabled,
                onClick(event: React.MouseEvent<HTMLButtonElement>) {
                    if (disabled) return;
                    onClick?.(event);
                    if (!event.defaultPrevented) {
                        handleOpenChange(true);
                    }
                }
            })}
        >
            {children}
        </ButtonPrimitive>
    );
});

DialogPrimitiveTrigger.displayName = 'DialogPrimitiveTrigger';

export default DialogPrimitiveTrigger;
