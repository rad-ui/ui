'use client';
import React, { useContext } from 'react';
import { clsx } from 'clsx';
import ButtonPrimitive from '~/core/primitives/Button';
import { AlertDialogContext } from '../contexts/AlertDialogContext';

import DialogPrimitive from '~/core/primitives/Dialog';

export type AlertDialogTriggerProps = {
    children: React.ReactNode;
    asChild?: boolean;
    className?: string;
}

const AlertDialogTrigger = ({ children, asChild, className = '', ...props } : AlertDialogTriggerProps) => {
    const { rootClass } = useContext(AlertDialogContext);

    return (
        <DialogPrimitive.Trigger className={clsx(`${rootClass}-trigger`, className)} asChild={asChild} {...props}>
            {children}
        </DialogPrimitive.Trigger>

    );
};

export default AlertDialogTrigger;
