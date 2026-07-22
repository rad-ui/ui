'use client';
import React from 'react';
import clsx from 'clsx';
import { useStepsContext } from '../context/StepsContext';
import Primitive from '~/core/primitives/Primitive';

export type StepBubbleProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;

const StepBubble = React.forwardRef<React.ElementRef<typeof Primitive.div>, StepBubbleProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useStepsContext();
    return <Primitive.div ref={ref} className={clsx(rootClass && `${rootClass}-bubble`, className)} {...props}>{children}</Primitive.div>;
});

StepBubble.displayName = 'StepBubble';

export default StepBubble;
