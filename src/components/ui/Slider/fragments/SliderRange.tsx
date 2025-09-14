'use client';

import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import { SliderContext } from '../context/SliderContext';

const COMPONENT_NAME = 'SliderRange';

export type SliderRangeElement = ElementRef<'div'>;
export type SliderRangeProps = { children: React.ReactNode } & ComponentPropsWithoutRef<'div'>;

const SliderRange = forwardRef<SliderRangeElement, SliderRangeProps>(({ children, ...props }, ref) => {
    const { rootClass, value, minValue, maxValue, orientation } = React.useContext(SliderContext);
    const percent = maxValue === minValue ? 0 : ((value - minValue) / (maxValue - minValue)) * 100;

    return (
        <div
            ref={ref}
            className={`${rootClass}-range`}
            style={orientation === 'vertical'
                ? {
                    height: `${percent}%`,
                    bottom: 0,
                    top: 'auto'
                }
                : { width: `${percent}%` }
            }
            {...props}
        >
            {children}
        </div>
    );
});

SliderRange.displayName = COMPONENT_NAME;

export default SliderRange;
