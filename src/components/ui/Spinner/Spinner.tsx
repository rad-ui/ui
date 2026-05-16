'use client';
import React, { ElementRef, ComponentPropsWithoutRef } from 'react';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import { createDataAttributes } from '~/core/hooks/createDataAttribute';
import clsx from 'clsx';

const COMPONENT_NAME = 'Spinner';

export type SpinnerProps = {
    customRootClass?: string;
    size?: string;
} & ComponentPropsWithoutRef<'span'>;

type SpinnerElement = ElementRef<'span'>;

const Spinner = React.forwardRef<SpinnerElement, SpinnerProps>(({ className, customRootClass = '', size = '', ...props }, ref) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
    const dataAttributes = createDataAttributes('spinner', { size });
    const mergedClassName = clsx(rootClass, className) || undefined;

    return (
        <div className={rootClass ? `${rootClass}-container` : undefined}>
            <span
                ref={ref}
                className={mergedClassName} {...props}
                {...dataAttributes}>
            </span>
        </div>
    );
});

Spinner.displayName = COMPONENT_NAME;

export default Spinner;
