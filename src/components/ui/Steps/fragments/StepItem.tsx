'use client';

import React from 'react';
import StepsContext from '../context/StepsContext';
import clsx from 'clsx';

const StepItem = ({ children, value = null, className = '', ...props }: StepItemProps) => {
    const { rootClass, currentStep, setCurrentStep } = React.useContext(StepsContext);
    return <div className={clsx(`${rootClass}-item`, className)} {...props}>{children}</div>;
};

export default StepItem;
