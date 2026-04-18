'use client';
import React, { forwardRef } from 'react';
import DialogPrimitive from '~/core/primitives/Dialog';

type DialogPortalElement = React.ElementRef<'div'>;
type DialogPrimitivePortalProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Portal>;

export type DialogPortalProps = DialogPrimitivePortalProps;

const DialogPortal = forwardRef<DialogPortalElement, DialogPortalProps>(({ children, ...props }, _ref) => {
    // TODO: forceMount on dialog portal/content is useful for exit animations,
    // but focus return is currently incomplete for that case. See DialogPrimitive.Content.
    return (
        <DialogPrimitive.Portal {...props}>
            {children}
        </DialogPrimitive.Portal>
    );
});

DialogPortal.displayName = 'DialogPortal';

export default DialogPortal;
