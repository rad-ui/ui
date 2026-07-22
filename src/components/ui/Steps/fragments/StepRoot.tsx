'use client';
import React, { useState } from 'react';
import clsx from 'clsx';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import Primitive from '~/core/primitives/Primitive';
import StepsContext from '../context/StepsContext';

import useControllableState from '~/core/hooks/useControllableState';

const COMPONENT_NAME = 'Steps';

export type StepsRootProps = React.ComponentPropsWithoutRef<typeof Primitive.div> & {
    customRootClass?: string;
    orientation?: 'horizontal' | 'vertical';
    value?: number;
    defaultValue?: number;
    onValueChange?: (value: number) => void;
};

const StepsRoot = React.forwardRef<React.ElementRef<typeof Primitive.div>, StepsRootProps>(({
    children,
    className,
    customRootClass,
    orientation = 'horizontal',
    value,
    defaultValue,
    onValueChange,
    ...props
}, ref) => {
    const [currentStep, setCurrentStep] = useControllableState<number>(value, defaultValue ?? 0, onValueChange);

    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);

    return <StepsContext.Provider value={{ currentStep, setCurrentStep, rootClass, orientation }}>
        <Primitive.div ref={ref} className={clsx(rootClass, className, rootClass && `${rootClass}-${orientation}`)} data-orientation={orientation} {...props}>{children}</Primitive.div>
    </StepsContext.Provider>;
});

StepsRoot.displayName = 'StepsRoot';

export default StepsRoot;
