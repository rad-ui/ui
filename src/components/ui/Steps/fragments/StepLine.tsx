'use client';
import React from 'react';
import clsx from 'clsx';
import { useStepsContext } from '../context/StepsContext';
import Primitive from '~/core/primitives/Primitive';

export type StepLineProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;

const StepLine = React.forwardRef<React.ElementRef<typeof Primitive.div>, StepLineProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useStepsContext();
    return <Primitive.div ref={ref} className={clsx(rootClass && `${rootClass}-line`, className)} {...props}>{children}</Primitive.div>;
});

StepLine.displayName = 'StepLine';

export default StepLine;
