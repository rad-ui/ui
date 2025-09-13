'use client';
import React, { forwardRef, useContext } from 'react';
import clsx from 'clsx';

import { DialogContext } from '../context/DialogContext';

import DialogPrimitive from '~/core/primitives/Dialog';

type DialogTriggerElement = React.ElementRef<typeof DialogPrimitive.Trigger>;
type DialogPrimitiveTriggerProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>;

export type DialogTriggerProps = DialogPrimitiveTriggerProps & {
    className?: string;
};

const DialogTrigger = forwardRef<DialogTriggerElement, DialogTriggerProps>(({ children, asChild, className = '', ...props }, ref) => {
    const { rootClass } = useContext(DialogContext);

    return (
        <DialogPrimitive.Trigger ref={ref} className={clsx(`${rootClass}-trigger`, className)} asChild={asChild} {...props}>
            {children}
        </DialogPrimitive.Trigger>

    );
});

DialogTrigger.displayName = 'DialogTrigger';

export default DialogTrigger;
