'use client';
import React, { forwardRef, useContext } from 'react';
import { AlertDialogContext } from '../contexts/AlertDialogContext';
import clsx from 'clsx';

import DialogPrimitive from '~/core/primitives/Dialog';

type AlertDialogOverlayElement = React.ElementRef<typeof DialogPrimitive.Overlay>;
type DialogPrimitiveOverlayProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>;

type AlertDialogOverlayProps = DialogPrimitiveOverlayProps & {
    className?: string;
};

const AlertDialogOverlay = forwardRef<AlertDialogOverlayElement, AlertDialogOverlayProps>(({ className = '', ...props }, ref) => {
    const { rootClass } = useContext(AlertDialogContext);
    return (
        <DialogPrimitive.Overlay ref={ref} className={clsx(`${rootClass}-overlay`, className)} {...props}></DialogPrimitive.Overlay>
    );
});

AlertDialogOverlay.displayName = 'AlertDialogOverlay';

export default AlertDialogOverlay;
