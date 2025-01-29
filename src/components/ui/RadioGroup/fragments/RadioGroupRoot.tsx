import React from 'react';
import RadioGroupPrimitive from '~/core/primitives/RadioGroup/RadioGroupPrimitive';

import clsx from 'clsx';
import { customClassSwitcher } from '~/core';

import { RadioGroupContext } from '../context/RadioGroupContext';

const COMPONENT_NAME = 'RadioGroup';

type RadioGroupRootProps = {
    children: React.ReactNode;
    className?: string;
    defaultChecked?: string | null;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    customRootClass?: string;
};

const RadioGroupRoot = ({ children, className = '', defaultChecked = null, onChange = null, customRootClass = '' }: RadioGroupRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    return <RadioGroupContext.Provider value={{ defaultChecked, rootClass, onChange }}>
        <RadioGroupPrimitive.Root className={clsx(rootClass, className)} customRootClass={customRootClass}>{children}</RadioGroupPrimitive.Root>
    </RadioGroupContext.Provider>;
};

export default RadioGroupRoot;
