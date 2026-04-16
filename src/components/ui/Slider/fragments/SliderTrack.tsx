'use client';

import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import { SliderContext } from '../context/SliderContext';
import clsx from 'clsx';

const COMPONENT_NAME = 'SliderTrack';

export type SliderTrackElement = ElementRef<'div'>;
export type SliderTrackProps = { children: React.ReactNode } & ComponentPropsWithoutRef<'div'>;

const SliderTrack = forwardRef<SliderTrackElement, SliderTrackProps>(({ children, className, style, ...props }, ref) => {
    const { rootClass, orientation } = React.useContext(SliderContext);
    const orientationStyle: React.CSSProperties = orientation === 'vertical'
        ? {
            rotate: '180deg',
            position: 'relative'
        }
        : {
            position: 'relative'
        };
    const mergedClassName = clsx(rootClass ? `${rootClass}-track` : undefined, className) || undefined;

    return (
        <div
            ref={ref}
            className={mergedClassName}
            style={{ ...style, ...orientationStyle }}
            {...props}
        >
            {children}
        </div>
    );
});

SliderTrack.displayName = COMPONENT_NAME;

export default SliderTrack;
