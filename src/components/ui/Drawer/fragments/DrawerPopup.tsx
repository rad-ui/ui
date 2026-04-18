'use client';

import React, { forwardRef, useContext } from 'react';
import clsx from 'clsx';
import DialogPrimitive from '~/core/primitives/Dialog';
import { DrawerContext } from '../context/DrawerContext';

type DrawerPopupElement = React.ElementRef<typeof DialogPrimitive.Content>;
type DialogPrimitiveContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>;

export type DrawerPopupProps = DialogPrimitiveContentProps & {
    className?: string;
};

const DrawerPopup = forwardRef<DrawerPopupElement, DrawerPopupProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass, swipeDirection } = useContext(DrawerContext);

    return (
        <DialogPrimitive.Content
            ref={ref}
            className={clsx(rootClass && `${rootClass}-popup`, className)}
            data-swipe-direction={swipeDirection}
            {...props}
        >
            {children}
        </DialogPrimitive.Content>
    );
});

DrawerPopup.displayName = 'DrawerPopup';

export default DrawerPopup;
