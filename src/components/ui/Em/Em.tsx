'use client';
import React, { ComponentPropsWithoutRef, ElementRef } from 'react';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';

const COMPONENT_NAME = 'Em';

export type EmProps = ComponentPropsWithoutRef<'em'> & {
    customRootClass?: string;
};

const Em = React.forwardRef<ElementRef<'em'>, EmProps>(({ children, customRootClass, className, ...props }, ref) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    return (
        <em ref={ref} className={clsx(rootClass, className)} {...props}>
            {children}
        </em>
    );
});

Em.displayName = COMPONENT_NAME;

export default Em;
