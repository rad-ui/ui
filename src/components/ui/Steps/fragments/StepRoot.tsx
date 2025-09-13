'use client';
import React, { useState } from 'react';
import clsx from 'clsx';
import { customClassSwitcher } from '~/core';
import Primitive from '~/core/primitives/Primitive';
import StepsContext from '../context/StepsContext';

const COMPONENT_NAME = 'Steps';

const StepsRoot = ({ children, className, customRootClass, ...props }: StepsRootProps) => {
    const [currentStep, setCurrentStep] = useState(0);

    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    return <StepsContext.Provider value={{ currentStep, setCurrentStep, rootClass }}>
        <Primitive.div className={clsx(rootClass, className)} {...props}>{children}</Primitive.div>
    </StepsContext.Provider>;
};

export default StepsRoot;
