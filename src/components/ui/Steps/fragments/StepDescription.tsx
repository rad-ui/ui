'use client';
import React from 'react';
import clsx from 'clsx';
import { useStepsContext } from '../context/StepsContext';

type StepDescriptionProps = React.HTMLAttributes<HTMLDivElement>;

const StepDescription = ({ children, className = '', ...props }: StepDescriptionProps) => {
    const { rootClass } = useStepsContext();
    return <div className={clsx(`${rootClass}-description`, className)} {...props}>{children}</div>;
};

export default StepDescription;
