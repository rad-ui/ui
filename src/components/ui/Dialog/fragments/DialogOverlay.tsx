'use client';
import React, { forwardRef, useContext } from 'react';
import { DialogContext } from '../context/DialogContext';
import { clsx } from 'clsx';

import DialogPrimitive from '~/core/primitives/Dialog';

type DialogOverlayElement = React.ElementRef<typeof DialogPrimitive.Overlay>;
type DialogPrimitiveOverlayProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>;

export type DialogOverlayProps = DialogPrimitiveOverlayProps & {
    className?: string;
};

const DialogOverlay = forwardRef<DialogOverlayElement, DialogOverlayProps>(({ className = '', ...props }, ref) => {
    const { rootClass } = useContext(DialogContext);
    return <DialogPrimitive.Overlay ref={ref} className={clsx(`${rootClass}-overlay`, className)} {...props} />;
});

DialogOverlay.displayName = 'DialogOverlay';

export default DialogOverlay;
