'use client';
import React from 'react';
import clsx from 'clsx';
import StepsContext from '../context/StepsContext';

const StepDescription = ({ children, className = '', ...props }: StepDescriptionProps) => {
    const { rootClass } = React.useContext(StepsContext);
    return <div className={clsx(`${rootClass}-description`, className)} {...props}>{children}</div>;
};

export default StepDescription;
