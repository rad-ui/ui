'use client';
import React, { useState } from 'react';
import clsx from 'clsx';
import { customClassSwitcher } from '~/core';
import Primitive from '~/core/primitives/Primitive';
import StepsContext from '../context/StepsContext';

import useControllableState from '~/core/hooks/useControllableState';

const COMPONENT_NAME = 'Steps';

type StepsRootProps = React.HTMLAttributes<HTMLDivElement> & {
    customRootClass?: string;
    orientation?: 'horizontal' | 'vertical';
    value?: number;
    defaultValue?: number;
    onValueChange?: (value: number) => void;
};

const StepsRoot = ({
    children,
    className,
    customRootClass,
    orientation = 'horizontal',
    value,
    defaultValue,
    onValueChange,
    ...props
}: StepsRootProps) => {
    const [currentStep, setCurrentStep] = useControllableState<number>(value, defaultValue ?? 0, onValueChange);

    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    return <StepsContext.Provider value={{ currentStep, setCurrentStep, rootClass, orientation }}>
        <Primitive.div className={clsx(rootClass, className, `${rootClass}-${orientation}`)} data-orientation={orientation} {...props}>{children}</Primitive.div>
    </StepsContext.Provider>;
};

export default StepsRoot;
