'use client';

import React, { forwardRef, useContext } from 'react';
import clsx from 'clsx';
import DialogPrimitive from '~/core/primitives/Dialog';
import { AlertDialogContext } from '../contexts/AlertDialogContext';

type AlertDialogFooterElement = React.ElementRef<typeof DialogPrimitive.Footer>;
type DialogPrimitiveFooterProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Footer>;

export type AlertDialogFooterProps = DialogPrimitiveFooterProps & {
    className?: string;
};

const AlertDialogFooter = forwardRef<AlertDialogFooterElement, AlertDialogFooterProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useContext(AlertDialogContext);

    return (
        <DialogPrimitive.Footer ref={ref} className={clsx(rootClass && `${rootClass}-footer`, className)} {...props}>
            {children}
        </DialogPrimitive.Footer>
    );
});

AlertDialogFooter.displayName = 'AlertDialogFooter';

export default AlertDialogFooter;
