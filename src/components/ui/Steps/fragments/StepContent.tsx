'use client';
import React from 'react';
import clsx from 'clsx';
import { useStepsContext } from '../context/StepsContext';

export type StepContentProps = React.HTMLAttributes<HTMLDivElement>;

const StepContent = React.forwardRef<HTMLDivElement, StepContentProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useStepsContext();
    return <div ref={ref} className={clsx(rootClass && `${rootClass}-content`, className)} {...props}>{children}</div>;
});

StepContent.displayName = 'Steps.Content';

export default StepContent;
