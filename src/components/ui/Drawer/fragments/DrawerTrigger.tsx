'use client';
import React, { useContext } from 'react';
import { clsx } from 'clsx';

import { DrawerContext } from '../context/DrawerContext';

import DialogPrimitive from '~/core/primitives/Dialog';

export type DrawerTriggerProps = {
    children: React.ReactNode;
    asChild?: boolean;
    className?: string;
}

const DrawerTrigger = ({ children, asChild, className = '', ...props } : DrawerTriggerProps) => {
    const { rootClass } = useContext(DrawerContext);

    return (
        <DialogPrimitive.Trigger className={clsx(`${rootClass}-trigger`, className)} asChild={asChild} {...props}>
            {children}
        </DialogPrimitive.Trigger>

    );
};

export default DrawerTrigger;
