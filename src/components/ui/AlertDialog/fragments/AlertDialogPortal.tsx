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
    // TODO: forceMount here is affected by the same focus-return limitation as Dialog:
    // keeping content mounted for animations currently skips automatic trigger refocus.
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
