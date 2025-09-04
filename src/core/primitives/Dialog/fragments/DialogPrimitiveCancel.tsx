'use client';
import React, { forwardRef, useContext } from 'react';
import { DialogPrimitiveContext } from '../context/DialogPrimitiveContext';
import ButtonPrimitive from '~/core/primitives/Button';

export type DialogPrimitiveCancelProps = {
    children: React.ReactNode;
    asChild?: boolean;
    className?: string;
}

const DialogPrimitiveCancel = forwardRef<HTMLButtonElement, DialogPrimitiveCancelProps>(({ children, asChild, ...props }, ref) => {
    const { handleOpenChange, getItemProps } = useContext(DialogPrimitiveContext);
    return (
        <ButtonPrimitive
            ref={ref}
            asChild={asChild}
            onClick={() => handleOpenChange(false)}
            {...getItemProps()}
            {...props}
        >
            {children}
        </ButtonPrimitive>
    );
});

export default DialogPrimitiveCancel;
