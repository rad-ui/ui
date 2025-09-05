'use client';

import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import { SliderContext } from '../context/SliderContext';

const COMPONENT_NAME = 'SliderThumb';

export type SliderThumbElement = ElementRef<'div'>;
export type SliderThumbProps = { children?: React.ReactNode } & ComponentPropsWithoutRef<'div'>;

const SliderThumb = forwardRef<SliderThumbElement, SliderThumbProps>(({ children: _children, ...props }, ref) => {
    const { rootClass, value } = React.useContext(SliderContext);
    const sliderInputRef = React.useRef<HTMLInputElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        sliderInputRef.current?.focus();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
    };

    return <div ref={ref} className={`${rootClass}-thumb`} onClick={handleClick} style={{ left: `calc(${value}% - 16px)` }} {...props}>
        <span className={`${rootClass}-thumb-value`}></span>
        <input onChange={handleChange} value={value} style={{ display: 'none' }} ref={sliderInputRef} />
    </div>;
});

SliderThumb.displayName = COMPONENT_NAME;

export default SliderThumb;
