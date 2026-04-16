'use client';
import React from 'react';
import clsx from 'clsx';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';

const COMPONENT_NAME = 'Strong';

export type StrongProps = React.ComponentPropsWithoutRef<'strong'> & {
    customRootClass?: string;
    className?: string;
};

const Strong = React.forwardRef<React.ElementRef<'strong'>, StrongProps>(
    ({ children, className, customRootClass, ...props }, ref) => {
        const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
        return (
            <strong ref={ref} className={clsx(rootClass, className)} {...props}>
                {children}
            </strong>
        );
    }
);

Strong.displayName = COMPONENT_NAME;

export default Strong;
