'use client';
import React from 'react';
import DialogPrimitive from '~/core/primitives/Dialog';

type DialogPrimitivePortalProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Portal>;

export type AlertDialogPortalProps = DialogPrimitivePortalProps & {
    container?: Element | null;
    forceMount?: boolean;
    keepMounted?: boolean;
};

const AlertDialogPortal = ({
    children,
    ...props
}: AlertDialogPortalProps) => {
    return (
        <DialogPrimitive.Portal
            {...props}
        >
            {children}
        </DialogPrimitive.Portal>
    );
};

AlertDialogPortal.displayName = 'AlertDialogPortal';

export default AlertDialogPortal;
