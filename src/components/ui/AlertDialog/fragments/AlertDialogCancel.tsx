'use client';
import React, { forwardRef, useContext } from 'react';
import { AlertDialogContext } from '../contexts/AlertDialogContext';

import DialogPrimitive from '~/core/primitives/Dialog';

type AlertDialogCancelElement = React.ElementRef<typeof DialogPrimitive.Cancel>;
type DialogPrimitiveCancelProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Cancel>;

export type AlertDialogCancelProps = DialogPrimitiveCancelProps & {
    className?: string;
};

const AlertDialogCancel = forwardRef<AlertDialogCancelElement, AlertDialogCancelProps>(({ children, asChild, className = '', ...props }, ref) => {
    const { rootClass } = useContext(AlertDialogContext);
    return (
        <DialogPrimitive.Cancel ref={ref} className={`${rootClass}-cancel ${className}`} asChild={asChild} {...props}>
            {children}
        </DialogPrimitive.Cancel>
    );
});

export default AlertDialogCancel;
