'use client';
import React, { forwardRef, ComponentPropsWithoutRef, ElementRef } from 'react';
import Primitive from '~/core/primitives/Primitive';
import { VISUALLY_HIDDEN_STYLES } from './visuallyHiddenStyles';

const COMPONENT_NAME = 'LiveRegion';

export type LiveRegionElement = ElementRef<typeof Primitive.div>;
export type LiveRegionPoliteness = 'polite' | 'assertive';

export type LiveRegionProps = {
    politeness?: LiveRegionPoliteness;
    atomic?: boolean;
} & ComponentPropsWithoutRef<typeof Primitive.div>;

const LiveRegion = forwardRef<LiveRegionElement, LiveRegionProps>(
    ({ children, politeness = 'polite', atomic = true, style, ...props }, ref) => {
        return (
            <Primitive.div
                ref={ref}
                aria-live={politeness}
                aria-atomic={atomic}
                style={{ ...VISUALLY_HIDDEN_STYLES, ...style }}
                {...props}
            >
                {children}
            </Primitive.div>
        );
    }
);

LiveRegion.displayName = COMPONENT_NAME;

export default LiveRegion;
