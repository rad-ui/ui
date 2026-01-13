'use client';
import React, { useState } from 'react';
import clsx from 'clsx';
import { customClassSwitcher } from '~/core';
import Primitive from '~/core/primitives/Primitive';
import StepsContext from '../context/StepsContext';

const COMPONENT_NAME = 'Steps';

type StepsRootProps = React.HTMLAttributes<HTMLDivElement> & {
    customRootClass?: string;
    orientation?: 'horizontal' | 'vertical';
};

const StepsRoot = ({ children, className, customRootClass, orientation = 'horizontal', ...props }: StepsRootProps) => {
    const [currentStep, setCurrentStep] = useState(0);

    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    return <StepsContext.Provider value={{ currentStep, setCurrentStep, rootClass, orientation }}>
        <Primitive.div className={clsx(rootClass, className, `${rootClass}-${orientation}`)} {...props}>{children}</Primitive.div>
    </StepsContext.Provider>;
};

export default StepsRoot;
