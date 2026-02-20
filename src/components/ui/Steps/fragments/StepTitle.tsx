'use client';
import React from 'react';
import clsx from 'clsx';
import { useStepsContext } from '../context/StepsContext';

type StepTitleProps = React.HTMLAttributes<HTMLDivElement>;

const StepTitle = ({ children, className = '', ...props }: StepTitleProps) => {
    const { rootClass } = useStepsContext();
    return <div className={clsx(`${rootClass}-title`, className)} {...props}>{children}</div>;
};

export default StepTitle;
