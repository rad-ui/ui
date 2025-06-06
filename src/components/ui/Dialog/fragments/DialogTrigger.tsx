'use client';
import React, { useContext } from 'react';
import { clsx } from 'clsx';

import { DialogContext } from '../context/DialogContext';

import DialogPrimitive from '~/core/primitives/Dialog';

export type DialogTriggerProps = {
    children: React.ReactNode;
    asChild?: boolean;
    className?: string;
}

const DialogTrigger = ({ children, asChild, className = '', ...props } : DialogTriggerProps) => {
    const { rootClass } = useContext(DialogContext);

    return (
        <DialogPrimitive.Trigger className={clsx(`${rootClass}-trigger`, className)} asChild={asChild} {...props}>
            {children}
        </DialogPrimitive.Trigger>

    );
};

export default DialogTrigger;
