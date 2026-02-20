'use client';

import React, { useContext, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import Primitive from '~/core/primitives/Primitive';
import { SwitchContext } from '../context/SwitchContext';

export type SwitchThumbElement = ElementRef<typeof Primitive.span>;
export type SwitchThumbProps = ComponentPropsWithoutRef<typeof Primitive.span> & {
    asChild?: boolean;
    className?: string;
    children?: React.ReactNode;
};

const SwitchThumb = forwardRef<SwitchThumbElement, SwitchThumbProps>(({ asChild = false, className, children, ...props }, ref) => {
    const { checked, rootClass, disabled } = useContext(SwitchContext);

    const dataAttributes: Record<string, string> = {};
    dataAttributes['data-state'] = checked ? 'checked' : 'unchecked';
    if (disabled) {
        dataAttributes['data-disabled'] = '';
    }

    return (
        <Primitive.span
            ref={ref}
            role='switch'
            className={`${rootClass}-indicator ${className || ''}`}
            asChild={asChild}
            {...dataAttributes}
            {...props}
        >
            {children}
        </Primitive.span>
    );
});

SwitchThumb.displayName = 'SwitchThumb';

export default SwitchThumb;
