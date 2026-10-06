'use client';
import React from 'react';
import clsx from 'clsx';
import { useStepsContext } from '../context/StepsContext';

export type StepDescriptionProps = React.HTMLAttributes<HTMLDivElement>;

const StepDescription = React.forwardRef<HTMLDivElement, StepDescriptionProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useStepsContext();
    return <div ref={ref} className={clsx(rootClass && `${rootClass}-description`, className)} {...props}>{children}</div>;
});

StepDescription.displayName = 'Steps.Description';

export default StepDescription;
