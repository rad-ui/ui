'use client';

import React, { forwardRef, useContext } from 'react';
import clsx from 'clsx';
import DialogPrimitive from '~/core/primitives/Dialog';
import { DrawerContext } from '../context/DrawerContext';

type DrawerBackdropElement = React.ElementRef<typeof DialogPrimitive.Overlay>;
type DialogPrimitiveOverlayProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>;

export type DrawerBackdropProps = DialogPrimitiveOverlayProps & {
    className?: string;
};

const DrawerBackdrop = forwardRef<DrawerBackdropElement, DrawerBackdropProps>(({ className = '', ...props }, ref) => {
    const { rootClass, swipeDirection } = useContext(DrawerContext);

    return (
        <DialogPrimitive.Overlay
            ref={ref}
            className={clsx(rootClass && `${rootClass}-backdrop`, className)}
            data-swipe-direction={swipeDirection}
            {...props}
        />
    );
});

DrawerBackdrop.displayName = 'DrawerBackdrop';

export default DrawerBackdrop;
