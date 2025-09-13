'use client';
import React from 'react';
import clsx from 'clsx';
import StepsContext from '../context/StepsContext';

const StepTitle = ({ children, className = '', ...props }: StepTitleProps) => {
    const { rootClass } = React.useContext(StepsContext);
    return <div className={clsx(`${rootClass}-title`, className)} {...props}>{children}</div>;
};

export default StepTitle;
