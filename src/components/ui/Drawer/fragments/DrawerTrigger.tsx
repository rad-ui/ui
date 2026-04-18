'use client';

import React, { forwardRef, useContext } from 'react';
import clsx from 'clsx';
import DialogPrimitive from '~/core/primitives/Dialog';
import { DrawerContext } from '../context/DrawerContext';

type DrawerTriggerElement = React.ElementRef<typeof DialogPrimitive.Trigger>;
type DialogPrimitiveTriggerProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>;

export type DrawerTriggerProps = DialogPrimitiveTriggerProps & {
    className?: string;
};

const DrawerTrigger = forwardRef<DrawerTriggerElement, DrawerTriggerProps>(({ children, asChild, className = '', ...props }, ref) => {
    const { rootClass } = useContext(DrawerContext);

    return (
        <DialogPrimitive.Trigger
            ref={ref}
            asChild={asChild}
            className={clsx(rootClass && `${rootClass}-trigger`, className)}
            {...props}
        >
            {children}
        </DialogPrimitive.Trigger>
    );
});

DrawerTrigger.displayName = 'DrawerTrigger';

export default DrawerTrigger;
