'use client';
import React, { forwardRef, useContext } from 'react';
import { AlertDialogContext } from '../contexts/AlertDialogContext';
import { clsx } from 'clsx';
import DialogPrimitive from '~/core/primitives/Dialog';

type AlertDialogContentElement = React.ElementRef<typeof DialogPrimitive.Content>;
type DialogPrimitiveContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>;

export type AlertDialogContentProps = DialogPrimitiveContentProps & {
    className?: string;
    asChild?: boolean;
    forceMount?: boolean;
};

const AlertDialogContent = forwardRef<AlertDialogContentElement, AlertDialogContentProps>(({
    children,
    className = '',
    asChild = false,
    forceMount = false,
    ...props
}, ref) => {
    const { rootClass, titleId, descriptionId } = useContext(AlertDialogContext);
    return (
        <DialogPrimitive.Content
            ref={ref}
            className={clsx(`${rootClass}-content`, className)}
            asChild={asChild}
            forceMount={forceMount}
            role="alertdialog"
            aria-modal={true}
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            {...props}
        >
            {children}
        </DialogPrimitive.Content>
    );
});

AlertDialogContent.displayName = 'AlertDialogContent';

export default AlertDialogContent;
