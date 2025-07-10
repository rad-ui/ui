import React from 'react';
import RadioGroupPrimitive from '~/core/primitives/RadioGroup/RadioGroupPrimitive';

import clsx from 'clsx';
import { customClassSwitcher } from '~/core';

import { RadioGroupContext } from '../context/RadioGroupContext';

const COMPONENT_NAME = 'RadioGroup';

type RadioGroupRootProps = {
  className?: string;
  customRootClass?: string;
  children: React.ReactNode;
};

const RadioGroupRoot = ({ children, className = '', customRootClass = '' }: RadioGroupRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    return <RadioGroupContext.Provider value={{ rootClass }}>
        <RadioGroupPrimitive.Root className={clsx(rootClass, className)} customRootClass={customRootClass}>{children}</RadioGroupPrimitive.Root>
    </RadioGroupContext.Provider>;
};

export default RadioGroupRoot;
