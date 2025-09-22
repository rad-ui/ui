'use client';
import React, { useContext } from 'react';
import { DrawerContext } from '../context/DrawerContext';
import { clsx } from 'clsx';
import DialogPrimitive from '~/core/primitives/Dialog';

export type DrawerTitleProps = {
    children: React.ReactNode;
    className?: string;
    asChild?: boolean;
}

const DrawerTitle = ({ children, className = '', asChild, ...props }: DrawerTitleProps) => {
    const { rootClass } = useContext(DrawerContext);
    const Comp = asChild ? React.Fragment : 'h2';
    const childProps = asChild ? {} : { className: clsx(`${rootClass}-title`, className), ...props };

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, {
            ...childProps,
            ...children.props,
            id: children.props.id || 'drawer-title'
        });
    }

    return (
        <Comp {...childProps} id="drawer-title">
            {children}
        </Comp>
    );
};

export default DrawerTitle;
