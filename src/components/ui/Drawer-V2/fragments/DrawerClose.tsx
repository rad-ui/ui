'use client';
import React, { forwardRef, useContext } from 'react';
import clsx from 'clsx';
import { DrawerContext } from '../context/DrawerContext';
import DialogPrimitive from '~/core/primitives/Dialog';

type DrawerCloseElement = React.ElementRef<typeof DialogPrimitive.Cancel>;
type DialogPrimitiveCancelProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Cancel>;

export type DrawerCloseProps = DialogPrimitiveCancelProps & {
    className?: string;
};

const DrawerClose = forwardRef<DrawerCloseElement, DrawerCloseProps>(({
    children,
    asChild,
    className = '',
    ...props
}, ref) => {
    const { rootClass } = useContext(DrawerContext);

    return (
        <DialogPrimitive.Cancel
            ref={ref}
            className={clsx(rootClass && `${rootClass}-close`, className)}
            asChild={asChild}
            {...props}
        >
            {children}
        </DialogPrimitive.Cancel>
    );
});

DrawerClose.displayName = 'DrawerClose';

export default DrawerClose;
