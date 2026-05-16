'use client';
import React, { forwardRef, useContext } from 'react';
import { DialogPrimitiveContext } from '../context/DialogPrimitiveContext';
import ButtonPrimitive from '~/core/primitives/Button';

export type DialogPrimitiveCancelProps = {
    children: React.ReactNode;
    asChild?: boolean;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const DialogPrimitiveCancel = forwardRef<HTMLButtonElement, DialogPrimitiveCancelProps>(({ children, asChild, onClick, ...props }, ref) => {
    const { handleOpenChange, getItemProps } = useContext(DialogPrimitiveContext);
    return (
        <ButtonPrimitive
            ref={ref}
            asChild={asChild}
            {...getItemProps()}
            {...props}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                onClick?.(e);
                handleOpenChange(false);
            }}
        >
            {children}
        </ButtonPrimitive>
    );
});

DialogPrimitiveCancel.displayName = 'DialogPrimitiveCancel';

export default DialogPrimitiveCancel;
