'use client';
import React, { forwardRef, useContext } from 'react';
import { AlertDialogContext } from '../contexts/AlertDialogContext';
import { clsx } from 'clsx';
import DialogPrimitive from '~/core/primitives/Dialog';

type AlertDialogContentElement = React.ElementRef<typeof DialogPrimitive.Content>;
type DialogPrimitiveContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>;

export type AlertDialogContentProps = DialogPrimitiveContentProps & {
    className?: string;
};

const AlertDialogContent = forwardRef<AlertDialogContentElement, AlertDialogContentProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useContext(AlertDialogContext);
    return (
        <DialogPrimitive.Content ref={ref} className={clsx(`${rootClass}-content`, className)} {...props}>
            {children}
        </DialogPrimitive.Content>
    );
});

export default AlertDialogContent;
