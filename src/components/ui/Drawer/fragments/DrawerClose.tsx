'use client';

import React, { forwardRef, useContext } from 'react';
import clsx from 'clsx';
import DialogPrimitive from '~/core/primitives/Dialog';
import { DrawerContext } from '../context/DrawerContext';

type DrawerCloseElement = React.ElementRef<typeof DialogPrimitive.Cancel>;
type DialogPrimitiveCancelProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Cancel>;

export type DrawerCloseProps = DialogPrimitiveCancelProps & {
    className?: string;
};

const DrawerClose = forwardRef<DrawerCloseElement, DrawerCloseProps>(({ children, asChild, className = '', ...props }, ref) => {
    const { rootClass } = useContext(DrawerContext);

    return (
        <DialogPrimitive.Cancel
            ref={ref}
            asChild={asChild}
            className={clsx(rootClass && `${rootClass}-close`, className)}
            {...props}
        >
            {children}
        </DialogPrimitive.Cancel>
    );
});

DrawerClose.displayName = 'DrawerClose';

export default DrawerClose;
