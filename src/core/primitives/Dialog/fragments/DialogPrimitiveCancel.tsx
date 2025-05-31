'use client';
import React, { useContext } from 'react';
import { DialogPrimitiveContext } from '../context/DialogPrimitiveContext';
import ButtonPrimitive from '~/core/primitives/Button';
import { clsx } from 'clsx';

export type DialogPrimitiveCancelProps = {
    children: React.ReactNode;
    asChild?: boolean;
    className?: string;
}

const DialogPrimitiveCancel = ({ children, asChild, className = '', ...props } : DialogPrimitiveCancelProps) => {
    const { rootClass, handleOpenChange, getItemProps } = useContext(DialogPrimitiveContext);
    return (
        <ButtonPrimitive
            asChild={asChild}
            onClick={() => handleOpenChange(false)}
            className={clsx(`${rootClass}-cancel`, className)}
            {...getItemProps()}
            {...props}
        >
            {children}
        </ButtonPrimitive>
    );
};

export default DialogPrimitiveCancel;
