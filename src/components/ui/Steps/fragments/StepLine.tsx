'use client';
import React from 'react';
import clsx from 'clsx';
import { useStepsContext } from '../context/StepsContext';

export type StepLineProps = React.HTMLAttributes<HTMLDivElement>;

const StepLine = React.forwardRef<HTMLDivElement, StepLineProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useStepsContext();
    return <div ref={ref} className={clsx(rootClass && `${rootClass}-line`, className)} {...props}>{children}</div>;
});

StepLine.displayName = 'Steps.Line';

export default StepLine;
