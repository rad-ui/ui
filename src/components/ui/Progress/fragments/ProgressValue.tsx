'use client';
import React, { forwardRef, useContext } from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import { ProgressContext } from '../contexts/ProgressContext';

export type ProgressValueProps = Omit<React.ComponentPropsWithoutRef<typeof Primitive.span>, 'children'> & {
    /** Custom text from the formatted value and the raw value. */
    children?: (formattedValue: string, value: number | null) => React.ReactNode;
};

/**
 * Shows the current value as text: the root's getValueLabel or format, or a
 * rounded percentage. It's hidden from screen readers, which already hear the
 * value from the root.
 */
const ProgressValue = forwardRef<HTMLSpanElement, ProgressValueProps>(({ className, children, ...props }, ref) => {
    const { rootClass, value, valueText, percentage } = useContext(ProgressContext);
    const formatted = valueText ?? (percentage === undefined ? '' : `${Math.round(percentage)}%`);
    return (
        <Primitive.span ref={ref} aria-hidden="true" className={clsx(rootClass && `${rootClass}-value`, className)} data-slot="progress-value" {...props}>
            {children ? children(formatted, value as number | null) : formatted}
        </Primitive.span>
    );
});

ProgressValue.displayName = 'ProgressValue';

export default ProgressValue;
