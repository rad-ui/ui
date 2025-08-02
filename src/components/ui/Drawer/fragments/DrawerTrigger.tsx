'use client';
import React, { useContext } from 'react';
import { clsx } from 'clsx';

import { DrawerContext } from '../context/DrawerContext';
import ButtonPrimitive from '~/core/primitives/Button';

export type DrawerTriggerProps = {
    children: React.ReactNode;
    asChild?: boolean;
    className?: string;
    onClick?: (event: React.MouseEvent) => void;
}

const DrawerTrigger = ({ children, asChild, className = '', onClick, ...props } : DrawerTriggerProps) => {
    const parentDrawerContext = useContext(DrawerContext);
    const { rootClass } = parentDrawerContext;

    // We need to find the actual drawer context for THIS drawer, not the parent
    // The trigger should open the drawer it belongs to, which means we need to get the handleOpenChange
    // from the nearest drawer root via DOM traversal (since context gives us parent drawer)
    const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        onClick?.(event);

        // Walk up the DOM to find the nearest drawer root
        let element = event.currentTarget as HTMLElement;
        while (element) {
            if (element.hasAttribute('data-drawer-root')) {
                const openChangeHandler = (element as any).__drawerOpenChange;
                if (openChangeHandler) {
                    openChangeHandler(true);
                    return;
                }
            }
            element = element.parentElement as HTMLElement;
        }
    };

    // Wrap in a div to handle event propagation
    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, {
            ...children.props,
            className: clsx(`${rootClass}-trigger`, className, children.props.className),
            onClick: handleClick
        });
    }

    return (
        <ButtonPrimitive
            className={clsx(`${rootClass}-trigger`, className)}
            onClick={handleClick}
            {...props}
        >
            {children}
        </ButtonPrimitive>
    );
};

export default DrawerTrigger;
