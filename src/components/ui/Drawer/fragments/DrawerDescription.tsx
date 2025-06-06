'use client';
import React, { useContext } from 'react';
import { DrawerContext } from '../context/DrawerContext';
import { clsx } from 'clsx';

export type DrawerDescriptionProps = {
    children: React.ReactNode;
    className?: string;
    asChild?: boolean;
}

const DrawerDescription = ({ children, className = '', asChild, ...props }: DrawerDescriptionProps) => {
    const { rootClass } = useContext(DrawerContext);
    const Comp = asChild ? React.Fragment : 'p';
    const childProps = asChild ? {} : { className: clsx(`${rootClass}-description`, className), ...props };

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, {
            ...childProps,
            ...children.props,
            id: children.props.id || 'drawer-description'
        });
    }

    return (
        <Comp {...childProps} id="drawer-description">
            {children}
        </Comp>
    );
};

export default DrawerDescription;
