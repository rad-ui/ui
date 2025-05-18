'use client';
import React, { useContext } from 'react';
import { AlertDialogContext } from '../contexts/AlertDialogContext';
import ButtonPrimitive from '~/core/primitives/Button';
import { clsx } from 'clsx';

export type AlertDialogCancelProps = {
    children: React.ReactNode;
    asChild?: boolean;
    className?: string;
}

const AlertDialogCancel = ({ children, asChild, className = '', ...props } : AlertDialogCancelProps) => {
    const { rootClass, handleOpenChange, getItemProps } = useContext(AlertDialogContext);
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

export default AlertDialogCancel;
