'use client';
import React from 'react';
import DialogPrimitive from '~/core/primitives/Dialog';

export type DrawerPortalProps = {
    children: React.ReactNode;
}

const DrawerPortal = ({ children, ...props }: DrawerPortalProps) => {
    return (
        <DialogPrimitive.Portal {...props}>
            {children}
        </DialogPrimitive.Portal>
    );
};

export default DrawerPortal;
