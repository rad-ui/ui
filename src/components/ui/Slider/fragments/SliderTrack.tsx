'use client';

import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import { SliderContext } from '../context/SliderContext';

const COMPONENT_NAME = 'SliderTrack';

export type SliderTrackElement = ElementRef<'div'>;
export type SliderTrackProps = { children: React.ReactNode } & ComponentPropsWithoutRef<'div'>;

const SliderTrack = forwardRef<SliderTrackElement, SliderTrackProps>(({ children, ...props }, ref) => {
    const { rootClass } = React.useContext(SliderContext);

    return (
        <div
            ref={ref}
            className={`${rootClass}-track`}
            style={{ position: 'relative' }}
            {...props}
        >
            {children}
        </div>
    );
});

SliderTrack.displayName = COMPONENT_NAME;

export default SliderTrack;
