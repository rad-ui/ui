'use client';

import React from 'react';
import { useStepsContext } from '../context/StepsContext';
import clsx from 'clsx';

type StepItemProps = React.HTMLAttributes<HTMLDivElement> & {
    value?: string | number | null;
};

const StepItem = ({ children, value = 0, className = '', ...props }: StepItemProps) => {
    const { rootClass, currentStep } = useStepsContext();
    const isCompleted = typeof value === 'number' && currentStep > value;
    const isActive = typeof value === 'number' && currentStep === value;
    const state = isCompleted ? 'completed' : isActive ? 'active' : 'inactive';

    return (
        <div
            className={clsx(`${rootClass}-item`, className)}
            data-state={state}
            data-value={value}
            {...props}
        >
            {children}
        </div>
    );
};

export default StepItem;
