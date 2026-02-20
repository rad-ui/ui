'use client';
import React, { forwardRef, useContext } from 'react';
import { DialogContext } from '../context/DialogContext';
import clsx from 'clsx';
import DialogPrimitive from '~/core/primitives/Dialog';

type DialogContentElement = React.ElementRef<typeof DialogPrimitive.Content>;
type DialogPrimitiveContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>;

export type DialogContentProps = DialogPrimitiveContentProps & {
    className?: string;
};

const DialogContent = forwardRef<DialogContentElement, DialogContentProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useContext(DialogContext);
    return (
        <DialogPrimitive.Content ref={ref} className={clsx(`${rootClass}-content`, className)} {...props}>
            {children}
        </DialogPrimitive.Content>
    );
});

DialogContent.displayName = 'DialogContent';

export default DialogContent;
