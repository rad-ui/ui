'use client';
import React, { useContext } from 'react';
import { DialogContext } from '../context/DialogContext';
import clsx from 'clsx';
import DialogPrimitive from '~/core/primitives/Dialog';

export type DialogCloseProps = {
    children: React.ReactNode;
    asChild?: boolean;
    className?: string;
}

const DialogClose = ({ children, asChild, className = '', ...props } : DialogCloseProps) => {
    const { rootClass } = useContext(DialogContext);
    return (
        <DialogPrimitive.Cancel className={clsx(`${rootClass}-close`, className)} asChild={asChild} {...props}>
            {children}
        </DialogPrimitive.Cancel>
    );
};

export default DialogClose;
