'use client';
import React from 'react';
import { clsx } from 'clsx';
import StepsContext from '../context/StepsContext';

const StepBubble = ({ children, className = '', ...props }: StepBubbleProps) => {
    const { rootClass } = React.useContext(StepsContext);
    return <div className={clsx(`${rootClass}-bubble`, className)} {...props}>{children}</div>;
};

export default StepBubble;
