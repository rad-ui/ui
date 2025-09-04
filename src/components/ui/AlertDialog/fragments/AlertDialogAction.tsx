'use client';
import React, { forwardRef, useContext } from 'react';
import { AlertDialogContext } from '../contexts/AlertDialogContext';
import DialogPrimitive from '~/core/primitives/Dialog';

type AlertDialogActionElement = React.ElementRef<typeof DialogPrimitive.Action>;
type DialogPrimitiveActionProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Action>;

export type AlertDialogActionProps = DialogPrimitiveActionProps & {
    className?: string;
};

const AlertDialogAction = forwardRef<AlertDialogActionElement, AlertDialogActionProps>(({ children, asChild, className = '', ...props }, ref) => {
    const { rootClass } = useContext(AlertDialogContext);
    return (
        <DialogPrimitive.Action ref={ref} className={`${rootClass}-action ${className}`} asChild={asChild} {...props}>
            {children}
        </DialogPrimitive.Action>

    );
});

export default AlertDialogAction;
