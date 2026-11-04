'use client';
import React, { forwardRef, useContext } from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import { ProgressContext } from '../contexts/ProgressContext';

export type ProgressTrackProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;

/**
 * The bar behind the Indicator. Optional: without it the root is the track.
 * Use it to place a Label and Value next to the bar.
 */
const ProgressTrack = forwardRef<HTMLDivElement, ProgressTrackProps>(({ className, ...props }, ref) => {
    const { rootClass } = useContext(ProgressContext);
    return <Primitive.div ref={ref} className={clsx(rootClass && `${rootClass}-track`, className)} data-slot="progress-track" {...props} />;
});

ProgressTrack.displayName = 'ProgressTrack';

export default ProgressTrack;
