'use client';
import React, { useContext } from 'react';
import { AlertDialogContext } from '../contexts/AlertDialogContext';
import { clsx } from 'clsx';
import DialogPrimitive from '~/core/primitives/Dialog';

export type AlertDialogContentProps = {
    children: React.ReactNode;
    className?: string;
}

const AlertDialogContent = ({ children, className = '' } : AlertDialogContentProps) => {
    const { rootClass } = useContext(AlertDialogContext);
    return (
        <>
            <DialogPrimitive.Content className={clsx(`${rootClass}-content`, className)} >
                {children}
            </DialogPrimitive.Content>
        </>
    );
};

export default AlertDialogContent;
