'use client';
import React, { forwardRef, useContext } from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import { MeterContext } from '../contexts/MeterContext';

export type MeterTrackProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;

/**
 * The bar behind the Indicator. Optional: without it the root is the track.
 * Use it to place a Label and Value next to the bar.
 */
const MeterTrack = forwardRef<HTMLDivElement, MeterTrackProps>(({ className, ...props }, ref) => {
    const { rootClass } = useContext(MeterContext);
    return <Primitive.div ref={ref} className={clsx(rootClass && `${rootClass}-track`, className)} data-slot="meter-track" {...props} />;
});

MeterTrack.displayName = 'MeterTrack';

export default MeterTrack;
