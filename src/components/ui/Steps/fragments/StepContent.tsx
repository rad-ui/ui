'use client';
import React from 'react';
import clsx from 'clsx';
import { useStepsContext } from '../context/StepsContext';

type StepContentProps = React.HTMLAttributes<HTMLDivElement>;

const StepContent = ({ children, className = '', ...props }: StepContentProps) => {
    const { rootClass } = useStepsContext();
    return <div className={clsx(`${rootClass}-content`, className)} {...props}>{children}</div>;
};

export default StepContent;
