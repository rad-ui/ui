'use client';
import React from 'react';
import clsx from 'clsx';
import { useStepsContext } from '../context/StepsContext';

export type StepBubbleProps = React.HTMLAttributes<HTMLDivElement>;

const StepBubble = React.forwardRef<HTMLDivElement, StepBubbleProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useStepsContext();
    return <div ref={ref} className={clsx(rootClass && `${rootClass}-bubble`, className)} {...props}>{children}</div>;
});

StepBubble.displayName = 'Steps.Bubble';

export default StepBubble;
