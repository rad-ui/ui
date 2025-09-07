'use client';
import React, { forwardRef, useContext } from 'react';
import { AlertDialogContext } from '../contexts/AlertDialogContext';
import { clsx } from 'clsx';

import DialogPrimitive from '~/core/primitives/Dialog';

type AlertDialogOverlayElement = React.ElementRef<typeof DialogPrimitive.Overlay>;
type DialogPrimitiveOverlayProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>;

export type AlertDialogOverlayProps = DialogPrimitiveOverlayProps & {
    className?: string;
    asChild?: boolean;
    forceMount?: boolean;
    children?: React.ReactNode;
};

const AlertDialogOverlay = forwardRef<AlertDialogOverlayElement, AlertDialogOverlayProps>(({
    className = '',
    asChild = false,
    forceMount = false,
    children,
    ...props
}, ref) => {
    const { rootClass } = useContext(AlertDialogContext);
    return (
        <DialogPrimitive.Overlay
            ref={ref}
            className={clsx(`${rootClass}-overlay`, className)}
            asChild={asChild}
            forceMount={forceMount}
            {...props}
        >
            {children}
        </DialogPrimitive.Overlay>
    );
});

AlertDialogOverlay.displayName = 'AlertDialogOverlay';

export default AlertDialogOverlay;
