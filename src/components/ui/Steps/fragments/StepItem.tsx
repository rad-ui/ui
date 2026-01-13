'use client';

import React from 'react';
import { useStepsContext } from '../context/StepsContext';
import clsx from 'clsx';

type StepItemProps = React.HTMLAttributes<HTMLDivElement> & {
    value?: string | number | null;
};

const StepItem = ({ children, value = null, className = '', ...props }: StepItemProps) => {
    const { rootClass, currentStep, setCurrentStep } = useStepsContext();
    return <div className={clsx(`${rootClass}-item`, className)} {...props}>{children}</div>;
};

export default StepItem;
