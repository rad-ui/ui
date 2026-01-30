'use client';

import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import { SliderContext } from '../context/SliderContext';

const COMPONENT_NAME = 'SliderRange';

export type SliderRangeElement = ElementRef<'div'>;
export type SliderRangeProps = { children?: React.ReactNode } & ComponentPropsWithoutRef<'div'>;

const SliderRange = forwardRef<SliderRangeElement, SliderRangeProps>(({ children, ...props }, ref) => {
    const { rootClass, value, minValue, maxValue, orientation } = React.useContext(SliderContext);
    let startPercent = 0;
    let endPercent = 0;

    if (Array.isArray(value)) {
        if (value.length === 0) {
            startPercent = 0;
            endPercent = 0;
        } else {
            const sortedValues = [...value].sort((a, b) => a - b);
            const minVal = sortedValues[0];
            const maxVal = sortedValues[sortedValues.length - 1];

            startPercent = maxValue === minValue ? 0 : ((minVal - minValue) / (maxValue - minValue)) * 100;
            endPercent = maxValue === minValue ? 0 : ((maxVal - minValue) / (maxValue - minValue)) * 100;

            // If there's only one value in the array, range is from 0 to that value
            if (value.length === 1) {
                startPercent = 0;
            }
        }
    } else {
        startPercent = 0;
        endPercent = maxValue === minValue ? 0 : ((value - minValue) / (maxValue - minValue)) * 100;
    }

    const length = endPercent - startPercent;

    return (
        <div
            ref={ref}
            className={`${rootClass}-range`}
            style={orientation === 'vertical'
                ? {
                    height: `${length}%`,
                    marginTop: `${100 - endPercent}%`
                }
                : {
                    marginLeft: `${startPercent}%`,
                    width: `${length}%`
                }
            }
            {...props}
        >
            {children}
        </div>
    );
});

SliderRange.displayName = COMPONENT_NAME;

export default SliderRange;
