'use client';
import React, { forwardRef } from 'react';
import DialogPrimitive from '~/core/primitives/Dialog';

type DrawerPortalElement = React.ElementRef<'div'>;
type DialogPrimitivePortalProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Portal>;

export type DrawerPortalProps = DialogPrimitivePortalProps;

const DrawerPortal = forwardRef<DrawerPortalElement, DrawerPortalProps>(({
    children,
    ...props
}, _ref) => {
    return (
        <DialogPrimitive.Portal {...props}>
            {children}
        </DialogPrimitive.Portal>
    );
});

DrawerPortal.displayName = 'DrawerPortal';

export default DrawerPortal;
