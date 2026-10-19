'use client';
import React from 'react';
import clsx from 'clsx';
import { useStepsContext } from '../context/StepsContext';
import Primitive from '~/core/primitives/Primitive';

export type StepTitleProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;

const StepTitle = React.forwardRef<HTMLDivElement, StepTitleProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useStepsContext();
    return <Primitive.div ref={ref} className={clsx(rootClass && `${rootClass}-title`, className)} {...props}>{children}</Primitive.div>;
});

StepTitle.displayName = 'Steps.Title';

export default StepTitle;
