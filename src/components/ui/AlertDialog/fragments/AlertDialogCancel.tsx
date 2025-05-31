'use client';
import React, { useContext } from 'react';
import { AlertDialogContext } from '../contexts/AlertDialogContext';

import DialogPrimitive from '~/core/primitives/Dialog';

export type AlertDialogCancelProps = {
    children: React.ReactNode;
    asChild?: boolean;
    className?: string;
}

const AlertDialogCancel = ({ children, asChild, className = '', ...props } : AlertDialogCancelProps) => {
    const { rootClass } = useContext(AlertDialogContext);
    return (
        <DialogPrimitive.Cancel className={`${rootClass}-cancel ${className}`} {...props}>
            {children}
        </DialogPrimitive.Cancel>
    );
};

export default AlertDialogCancel;
