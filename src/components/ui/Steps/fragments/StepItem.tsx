'use client';

import React from 'react';
import { useStepsContext } from '../context/StepsContext';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';

export type StepItemProps = React.ComponentPropsWithoutRef<typeof Primitive.div> & {
    value?: string | number | null;
};

const StepItem = React.forwardRef<React.ElementRef<typeof Primitive.div>, StepItemProps>(({ children, value = 0, className = '', ...props }, ref) => {
    const { rootClass, currentStep } = useStepsContext();
    const isCompleted = typeof value === 'number' && currentStep > value;
    const isActive = typeof value === 'number' && currentStep === value;
    const state = isCompleted ? 'completed' : isActive ? 'active' : 'inactive';

    return (
        <Primitive.div
            ref={ref}
            className={clsx(rootClass && `${rootClass}-item`, className)}
            data-state={state}
            data-value={value}
            {...props}
        >
            {children}
        </Primitive.div>
    );
});

StepItem.displayName = 'StepItem';

export default StepItem;
