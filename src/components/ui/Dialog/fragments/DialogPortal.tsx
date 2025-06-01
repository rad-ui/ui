'use client';
import React from 'react';
import DialogPrimitive from '~/core/primitives/Dialog';

export type DialogPortalProps = {
  children: React.ReactNode;
};

const DialogPortal = ({ children }: DialogPortalProps) => {
    return (
        <DialogPrimitive.Portal>
            {children}
        </DialogPrimitive.Portal>
    );
};

export default DialogPortal;
