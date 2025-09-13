'use client';
import React from 'react';
import clsx from 'clsx';
import StepsContext from '../context/StepsContext';

type StepLineProps = React.HTMLAttributes<HTMLDivElement>;

const StepLine = ({ children, className = '', ...props }: StepLineProps) => {
    const { rootClass } = React.useContext(StepsContext);
    return <div className={clsx(`${rootClass}-line`, className)} {...props}>{children}</div>;
};

export default StepLine;
