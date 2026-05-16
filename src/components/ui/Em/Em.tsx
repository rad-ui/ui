'use client';
import React, { ComponentPropsWithoutRef, ElementRef } from 'react';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import clsx from 'clsx';

const COMPONENT_NAME = 'Em';

export type EmProps = ComponentPropsWithoutRef<'em'> & {
    customRootClass?: string;
};

const Em = React.forwardRef<ElementRef<'em'>, EmProps>(({ children, customRootClass, className, ...props }, ref) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
    return (
        <em ref={ref} className={clsx(rootClass, className)} {...props}>
            {children}
        </em>
    );
});

Em.displayName = COMPONENT_NAME;

export default Em;
