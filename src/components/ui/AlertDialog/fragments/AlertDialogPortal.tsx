'use client';
import React, { forwardRef } from 'react';
import DialogPrimitive from '~/core/primitives/Dialog';

type AlertDialogPortalElement = React.ElementRef<'div'>;
type DialogPrimitivePortalProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Portal>;

export type AlertDialogPortalProps = DialogPrimitivePortalProps & {
    container?: Element | null;
    forceMount?: boolean;
    keepMounted?: boolean;
};

const AlertDialogPortal = forwardRef<AlertDialogPortalElement, AlertDialogPortalProps>(({
    children,
    container,
    forceMount,
    keepMounted,
    ...props
}, _ref) => {
    return (
        <DialogPrimitive.Portal
            container={container}
            forceMount={forceMount}
            keepMounted={keepMounted}
            {...props}
        >
            {children}
        </DialogPrimitive.Portal>
    );
});

AlertDialogPortal.displayName = 'AlertDialogPortal';

export default AlertDialogPortal;
