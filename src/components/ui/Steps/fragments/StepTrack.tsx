'use client';
import React from 'react';
import clsx from 'clsx';
import { useStepsContext } from '../context/StepsContext';
import Primitive from '~/core/primitives/Primitive';

export type StepTrackProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;

const StepTrack = React.forwardRef<React.ElementRef<typeof Primitive.div>, StepTrackProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useStepsContext();
    return <Primitive.div ref={ref} className={clsx(rootClass && `${rootClass}-track`, className)} {...props}>{children}</Primitive.div>;
});

StepTrack.displayName = 'StepTrack';

export default StepTrack;
