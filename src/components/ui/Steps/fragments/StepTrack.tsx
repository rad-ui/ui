'use client';
import React from 'react';
import clsx from 'clsx';
import { useStepsContext } from '../context/StepsContext';

export type StepTrackProps = React.HTMLAttributes<HTMLDivElement>;

const StepTrack = React.forwardRef<HTMLDivElement, StepTrackProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useStepsContext();
    return <div ref={ref} className={clsx(rootClass && `${rootClass}-track`, className)} {...props}>{children}</div>;
});

StepTrack.displayName = 'Steps.Track';

export default StepTrack;
