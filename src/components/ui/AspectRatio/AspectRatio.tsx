'use client';
import React, { ComponentPropsWithoutRef, ElementRef } from 'react';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import clsx from 'clsx';

const COMPONENT_NAME = 'AspectRatio';

export type AspectRatioProps = ComponentPropsWithoutRef<'div'> & {
    customRootClass?: string;
    ratio?: string | number;
};

const getValidRatio = (ratio: string | number) => {
    const ratioValue = String(ratio).trim();
    // Accepts both "16/9" and the CSS-style "16 / 9".
    const fractionMatch = ratioValue.match(/^(\d*\.?\d+)\s*\/\s*(\d*\.?\d+)$/);

    if (fractionMatch) {
        const [, width, height] = fractionMatch;
        return Number(width) > 0 && Number(height) > 0 ? ratioValue : '1';
    }

    const numericRatio = Number(ratioValue);

    return Number.isFinite(numericRatio) && numericRatio > 0 ? ratioValue : '1';
};

const AspectRatio = React.forwardRef<ElementRef<'div'>, AspectRatioProps>(({ children, customRootClass, className, ratio = '1', style, ...props }, ref) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);

    return (
        <div ref={ref} style={{ ...style, aspectRatio: getValidRatio(ratio) }} className={clsx(rootClass, className)} {...props}>
            {children}
        </div>
    );
});

AspectRatio.displayName = COMPONENT_NAME;

export default AspectRatio;
