'use client';
import React from 'react';
import DialogPrimitive from '~/core/primitives/Dialog';

export type AlertDialogPortalProps = {
  children: React.ReactNode;
};

const AlertDialogPortal = ({ children }: AlertDialogPortalProps) => {
    return (
        <DialogPrimitive.Portal>
            {children}
        </DialogPrimitive.Portal>
    );
};

export default AlertDialogPortal;
