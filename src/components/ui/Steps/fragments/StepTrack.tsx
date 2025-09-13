'use client';
import React from 'react';
import clsx from 'clsx';
import StepsContext from '../context/StepsContext';

type StepTrackProps = React.HTMLAttributes<HTMLDivElement>;

const StepTrack = ({ children, className = '', ...props }: StepTrackProps) => {
    const { rootClass } = React.useContext(StepsContext);
    return <div className={clsx(`${rootClass}-track`, className)} {...props}>{children}</div>;
};

export default StepTrack;
