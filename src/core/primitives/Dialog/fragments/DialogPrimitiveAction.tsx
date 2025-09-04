'use client';
import React, { forwardRef, useContext } from 'react';
import { DialogPrimitiveContext } from '../context/DialogPrimitiveContext';
import ButtonPrimitive from '~/core/primitives/Button';

export type DialogPrimitiveActionProps = {
    children: React.ReactNode;
    className?: string;
    asChild?: boolean;
}

const DialogPrimitiveAction = forwardRef<HTMLButtonElement, DialogPrimitiveActionProps>(({ children, asChild, ...props }, ref) => {
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

DialogPrimitiveAction.displayName = 'DialogPrimitiveAction';

export default DialogPrimitiveAction;
