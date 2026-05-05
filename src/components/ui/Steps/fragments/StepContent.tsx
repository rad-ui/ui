'use client';
import React from 'react';
import clsx from 'clsx';
import { useStepsContext } from '../context/StepsContext';
import Primitive from '~/core/primitives/Primitive';

export type StepContentProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;

const StepContent = React.forwardRef<React.ElementRef<typeof Primitive.div>, StepContentProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useStepsContext();
    return <Primitive.div ref={ref} className={clsx(rootClass && `${rootClass}-content`, className)} {...props}>{children}</Primitive.div>;
});

StepContent.displayName = 'StepContent';

export default StepContent;
