'use client';
import React from 'react';
import clsx from 'clsx';
import { useStepsContext } from '../context/StepsContext';

export type StepBubbleProps = React.HTMLAttributes<HTMLDivElement>;

const StepBubble = ({ children, className = '', ...props }: StepBubbleProps) => {
    const { rootClass } = useStepsContext();
    return <div className={clsx(rootClass && `${rootClass}-bubble`, className)} {...props}>{children}</div>;
};

export default StepBubble;
