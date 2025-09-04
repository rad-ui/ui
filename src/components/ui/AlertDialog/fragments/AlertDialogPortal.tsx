'use client';
import React, { forwardRef } from 'react';
import DialogPrimitive from '~/core/primitives/Dialog';

export type AlertDialogPortalProps = {
  children: React.ReactNode;
};

const AlertDialogPortal = forwardRef<HTMLDivElement, AlertDialogPortalProps>(({ children }, _ref) => {
    return (
        <DialogPrimitive.Portal>
            {children}
        </DialogPrimitive.Portal>
    );
});

AlertDialogPortal.displayName = 'AlertDialogPortal';

export default AlertDialogPortal;
