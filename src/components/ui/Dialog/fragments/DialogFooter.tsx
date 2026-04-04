'use client';

import React, { forwardRef, useContext } from 'react';
import clsx from 'clsx';
import DialogPrimitive from '~/core/primitives/Dialog';
import { DialogContext } from '../context/DialogContext';

type DialogFooterElement = React.ElementRef<typeof DialogPrimitive.Footer>;
type DialogPrimitiveFooterProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Footer>;

export type DialogFooterProps = DialogPrimitiveFooterProps & {
    className?: string;
};

const DialogFooter = forwardRef<DialogFooterElement, DialogFooterProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useContext(DialogContext);

    return (
        <DialogPrimitive.Footer ref={ref} className={clsx(`${rootClass}-footer`, className)} {...props}>
            {children}
        </DialogPrimitive.Footer>
    );
});

DialogFooter.displayName = 'DialogFooter';

export default DialogFooter;
