'use client';
import React, { forwardRef, useContext } from 'react';
import clsx from 'clsx';
import { AlertDialogContext } from '../contexts/AlertDialogContext';

import DialogPrimitive from '~/core/primitives/Dialog';

type AlertDialogTriggerElement = React.ElementRef<typeof DialogPrimitive.Trigger>;
type DialogPrimitiveTriggerProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>;

export type AlertDialogTriggerProps = DialogPrimitiveTriggerProps & {
    className?: string;
};

const AlertDialogTrigger = forwardRef<AlertDialogTriggerElement, AlertDialogTriggerProps>(({ children, asChild, className = '', ...props }, ref) => {
    const { rootClass } = useContext(AlertDialogContext);

    return (
        <DialogPrimitive.Trigger ref={ref} className={clsx(`${rootClass}-trigger`, className)} asChild={asChild} {...props}>
            {children}
        </DialogPrimitive.Trigger>

    );
});

AlertDialogTrigger.displayName = 'AlertDialogTrigger';

export default AlertDialogTrigger;
