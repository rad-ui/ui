'use client';
import React from 'react';
import clsx from 'clsx';
import StepsContext from '../context/StepsContext';

const StepContent = ({ children, className = '', ...props }: StepContentProps) => {
    const { rootClass } = React.useContext(StepsContext);
    return <div className={clsx(`${rootClass}-content`, className)} {...props}>{children}</div>;
};

export default StepContent;
