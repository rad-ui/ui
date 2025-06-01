'use client';
import React, { useContext } from 'react';
import { DialogContext } from '../context/DialogContext';
import { clsx } from 'clsx';
import DialogPrimitive from '~/core/primitives/Dialog';

export type DialogContentProps = {
    children: React.ReactNode;
    className?: string;
}

const DialogContent = ({ children, className = '' } : DialogContentProps) => {
    const { rootClass } = useContext(DialogContext);
    return (
        <>
            <DialogPrimitive.Content className={clsx(`${rootClass}-content`, className)} >
                {children}
            </DialogPrimitive.Content>
        </>
    );
};

export default DialogContent;
