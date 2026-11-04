'use client';

import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import { SliderContext } from '../context/SliderContext';
import clsx from 'clsx';
import { thumbCenterPosition } from '../utils/sliderMath';

const COMPONENT_NAME = 'SliderRange';

export type SliderRangeElement = ElementRef<'div'>;
export type SliderRangeProps = { children?: React.ReactNode } & ComponentPropsWithoutRef<'div'>;

const SliderRange = forwardRef<SliderRangeElement, SliderRangeProps>(({ children, className, style, ...props }, ref) => {
    const { rootClass, value, minValue, maxValue, orientation, isRtl, thumbAlignment } = React.useContext(SliderContext);
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
    // With edge alignment the fill runs between thumb centres, which sit inset from the ends.
    // In right-to-left the fill is mirrored first (it grows from the right edge).
    const hasStartThumb = Array.isArray(value) && value.length > 1;
    const mirrored = isRtl && orientation !== 'vertical';
    const edgeStart = mirrored
        ? thumbCenterPosition(100 - endPercent, 'edge')
        : hasStartThumb ? thumbCenterPosition(startPercent, 'edge') : '0%';
    const edgeEnd = mirrored
        ? (hasStartThumb ? thumbCenterPosition(100 - startPercent, 'edge') : '100%')
        : thumbCenterPosition(endPercent, 'edge');
    const edgeLength = `calc(${edgeEnd} - ${edgeStart})`;
    const mergedClassName = clsx(rootClass ? `${rootClass}-range` : undefined, className) || undefined;

    return (
        <div
            ref={ref}
            className={mergedClassName}
            style={{
                ...style,
                ...(thumbAlignment === 'edge'
                ? (orientation === 'vertical'
                    ? { height: edgeLength, marginTop: `calc(100% - ${edgeEnd})` }
                    : { marginLeft: edgeStart, width: edgeLength })
                : orientation === 'vertical'
                ? {
                    height: `${length}%`,
                    marginTop: `${100 - endPercent}%`
                }
                : {
                    // Physical margin: in right-to-left the filled part starts from the right edge.
                    marginLeft: `${isRtl ? 100 - endPercent : startPercent}%`,
                    width: `${length}%`
                })
            }}
            {...props}
        >
            {children}
        </div>
    );
});

SliderRange.displayName = COMPONENT_NAME;

export default SliderRange;
