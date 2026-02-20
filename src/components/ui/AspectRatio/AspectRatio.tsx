'use client';
import React, { ComponentPropsWithoutRef, ElementRef } from 'react';
import { customClassSwitcher } from '~/core';
import clsx from 'clsx';

const COMPONENT_NAME = 'AspectRatio';

export type AspectRatioProps = ComponentPropsWithoutRef<'div'> & {
    customRootClass?: string;
    ratio?: string;
};

const AspectRatio = React.forwardRef<ElementRef<'div'>, AspectRatioProps>(({ children, customRootClass, className, ratio = '1', ...props }, ref) => {
    if (isNaN(Number(ratio)) && !ratio.match(/^(\d+)\/(\d+)$/)) ratio = '1';
    if (Number(ratio) <= 0) ratio = '1';

    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    return (
        <div ref={ref} style={{ aspectRatio: ratio }} className={clsx(rootClass, className)} {...props}>
            {children}
        </div>
    );
});

AspectRatio.displayName = COMPONENT_NAME;

export default AspectRatio;
