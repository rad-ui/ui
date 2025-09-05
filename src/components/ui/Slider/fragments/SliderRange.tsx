'use client';

import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import { SliderContext } from '../context/SliderContext';

const COMPONENT_NAME = 'SliderRange';

export type SliderRangeElement = ElementRef<'div'>;
export type SliderRangeProps = { children: React.ReactNode } & ComponentPropsWithoutRef<'div'>;

const SliderRange = forwardRef<SliderRangeElement, SliderRangeProps>(({ children, ...props }, ref) => {
    const { rootClass, value } = React.useContext(SliderContext);

    return <div ref={ref} className={`${rootClass}-range`} style={{ left: `calc(${value}% - 16px)`, width: `calc(${value}%)` }} {...props}>{children}</div>;
});

SliderRange.displayName = COMPONENT_NAME;

export default SliderRange;
