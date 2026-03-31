'use client';
import React from 'react';
import clsx from 'clsx';
import { customClassSwitcher } from '~/core';

const COMPONENT_NAME = 'Strong';

export type StrongProps = React.ComponentPropsWithoutRef<'strong'> & {
    customRootClass?: string;
    detach?: boolean;
    className?: string;
};

const Strong = React.forwardRef<React.ElementRef<'strong'>, StrongProps>(
    ({ children, className, customRootClass, detach = false, ...props }, ref) => {
        const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME, detach);
        return (
            <strong ref={ref} className={clsx(rootClass, className)} {...props}>
                {children}
            </strong>
        );
    }
);

Strong.displayName = COMPONENT_NAME;

export default Strong;
