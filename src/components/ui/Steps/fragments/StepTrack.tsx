'use client';
import React from 'react';
import clsx from 'clsx';
import { useStepsContext } from '../context/StepsContext';

type StepTrackProps = React.HTMLAttributes<HTMLDivElement>;

const StepTrack = ({ children, className = '', ...props }: StepTrackProps) => {
    const { rootClass } = useStepsContext();
    return <div className={clsx(`${rootClass}-track`, className)} {...props}>{children}</div>;
};

export default StepTrack;
