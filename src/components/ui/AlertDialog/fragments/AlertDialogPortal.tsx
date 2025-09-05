'use client';
import React, { forwardRef } from 'react';
import DialogPrimitive from '~/core/primitives/Dialog';

type AlertDialogPortalElement = React.ElementRef<'div'>;
type DialogPrimitivePortalProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Portal>;

export type AlertDialogPortalProps = DialogPrimitivePortalProps;

const AlertDialogPortal = forwardRef<AlertDialogPortalElement, AlertDialogPortalProps>(({ children, ...props }, _ref) => {
    return (
        <DialogPrimitive.Portal {...props}>
            {children}
        </DialogPrimitive.Portal>
    );
});

AlertDialogPortal.displayName = 'AlertDialogPortal';

export default AlertDialogPortal;
