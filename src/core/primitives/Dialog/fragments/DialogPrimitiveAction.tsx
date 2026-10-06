'use client';
import React, { forwardRef, useContext } from 'react';
import { DialogPrimitiveContext } from '../context/DialogPrimitiveContext';
import ButtonPrimitive from '~/core/primitives/Button';

export type DialogPrimitiveActionProps = {
    children: React.ReactNode;
    className?: string;
    asChild?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const DialogPrimitiveAction = forwardRef<HTMLButtonElement, DialogPrimitiveActionProps>(({ children, asChild, onClick, ...props }, ref) => {
    const { handleOpenChange, getItemProps } = useContext(DialogPrimitiveContext);
    return (
        <ButtonPrimitive
            ref={ref}
            asChild={asChild}
            {...getItemProps({
                ...props,
                onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
                    onClick?.(e);
                    handleOpenChange(false);
                }
            })}
        >
            {children}
        </ButtonPrimitive>
    );
});

DialogPrimitiveAction.displayName = 'DialogPrimitiveAction';

export default DialogPrimitiveAction;
