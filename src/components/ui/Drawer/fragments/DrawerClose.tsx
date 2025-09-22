'use client';
import React, { useContext } from 'react';
import { DrawerContext } from '../context/DrawerContext';
import { clsx } from 'clsx';
import DialogPrimitive from '~/core/primitives/Dialog';

export type DrawerCloseProps = {
    children: React.ReactNode;
    className?: string;
    asChild?: boolean;
}

const DrawerClose = ({ children, className = '', asChild, ...props }: DrawerCloseProps) => {
    const { rootClass } = useContext(DrawerContext);

    return (
        <DialogPrimitive.Action
            className={clsx(`${rootClass}-close`, className)}
            asChild={asChild}
            {...props}
        >
            {children}
        </DialogPrimitive.Action>
    );
};

export default DrawerClose;
