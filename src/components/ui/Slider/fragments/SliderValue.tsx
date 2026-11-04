'use client';
import React, { forwardRef, useContext } from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import { SliderContext } from '../context/SliderContext';

export type SliderValueProps = Omit<React.ComponentPropsWithoutRef<typeof Primitive.output>, 'children'> & {
    /** Custom text from the formatted values and the raw values. */
    children?: (formattedValues: string[], values: number[]) => React.ReactNode;
};

/**
 * Shows the current value as text, formatted with the root's `formatValue`.
 * A range slider shows both values joined with an en dash.
 */
const SliderValue = forwardRef<HTMLOutputElement, SliderValueProps>(({ className, children, ...props }, ref) => {
    const { rootClass, value, formatValue } = useContext(SliderContext);
    const values = Array.isArray(value) ? value : [value];
    const formatted = values.map((item) => (formatValue ? formatValue(item) : String(item)));
    return (
        <Primitive.output
            ref={ref}
            aria-live="off"
            className={clsx(rootClass && `${rootClass}-value`, className)}
            data-slot="slider-value"
            {...props}
        >
            {children ? children(formatted, values) : formatted.join(' – ')}
        </Primitive.output>
    );
});

SliderValue.displayName = 'SliderValue';

export default SliderValue;
