'use client';
import React from 'react';
import clsx from 'clsx';
import { useStepsContext } from '../context/StepsContext';
import Primitive from '~/core/primitives/Primitive';

export type StepDescriptionProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;

const StepDescription = React.forwardRef<React.ElementRef<typeof Primitive.div>, StepDescriptionProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useStepsContext();
    return <Primitive.div ref={ref} className={clsx(rootClass && `${rootClass}-description`, className)} {...props}>{children}</Primitive.div>;
});

StepDescription.displayName = 'StepDescription';

export default StepDescription;
