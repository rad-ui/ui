'use client';
import React from 'react';
import clsx from 'clsx';
import { useStepsContext } from '../context/StepsContext';

export type StepTitleProps = React.HTMLAttributes<HTMLDivElement>;

const StepTitle = React.forwardRef<HTMLDivElement, StepTitleProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useStepsContext();
    return <div ref={ref} className={clsx(rootClass && `${rootClass}-title`, className)} {...props}>{children}</div>;
});

StepTitle.displayName = 'Steps.Title';

export default StepTitle;
