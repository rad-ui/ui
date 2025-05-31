'use client';
import React, { useContext } from 'react';
import { DialogPrimitiveContext } from '../context/DialogPrimitiveContext';
import ButtonPrimitive from '~/core/primitives/Button';

export type DialogPrimitiveActionProps = {
    children: React.ReactNode;
    className?: string;
    asChild?: boolean;
}

const DialogPrimitiveAction = ({ children, asChild, ...props } : DialogPrimitiveActionProps) => {
    const { handleOpenChange, getItemProps } = useContext(DialogPrimitiveContext);
    return (
        <ButtonPrimitive
            asChild={asChild}
            onClick={() => handleOpenChange(false)}
            {...getItemProps()}
            {...props}
        >
            {children}
        </ButtonPrimitive>
    );
};

export default DialogPrimitiveAction;
