'use client';
import React, { useContext } from 'react';
import { AlertDialogContext } from '../contexts/AlertDialogContext';
import DialogPrimitive from '~/core/primitives/Dialog';

export type AlertDialogActionProps = {
    children: React.ReactNode;
    asChild?: boolean;
    className?: string;
}

const AlertDialogAction = ({ children, asChild, className = '', ...props } : AlertDialogActionProps) => {
    const { rootClass } = useContext(AlertDialogContext);
    return (
        <DialogPrimitive.Action className={`${rootClass}-action ${className}`} {...props}>
            {children}
        </DialogPrimitive.Action>

    );
};

export default AlertDialogAction;
