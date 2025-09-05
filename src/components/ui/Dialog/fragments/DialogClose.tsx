'use client';
import React, { forwardRef, useContext } from 'react';
import { DialogContext } from '../context/DialogContext';
import clsx from 'clsx';
import DialogPrimitive from '~/core/primitives/Dialog';

type DialogCloseElement = React.ElementRef<typeof DialogPrimitive.Cancel>;
type DialogPrimitiveCloseProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Cancel>;

export type DialogCloseProps = DialogPrimitiveCloseProps & {
    className?: string;
};

const DialogClose = forwardRef<DialogCloseElement, DialogCloseProps>(({ children, asChild, className = '', ...props }, ref) => {
    const { rootClass } = useContext(DialogContext);
    return (
        <DialogPrimitive.Cancel ref={ref} className={clsx(`${rootClass}-close`, className)} asChild={asChild} {...props}>
            {children}
        </DialogPrimitive.Cancel>
    );
});

DialogClose.displayName = 'DialogClose';

export default DialogClose;
