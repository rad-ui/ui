import React from 'react';
import RadioGroupPrimitive, { RadioGroupPrimitiveProps } from '~/core/primitives/RadioGroup/RadioGroupPrimitive';

import clsx from 'clsx';
import { customClassSwitcher } from '~/core';

import { RadioGroupContext } from '../context/RadioGroupContext';

import { useCreateDataAttribute, useComposeAttributes, useCreateDataAccentColorAttribute } from '~/core/hooks/createDataAttribute';

const COMPONENT_NAME = 'RadioGroup';

type RadioGroupRootProps = {
    children: React.ReactNode;
    className?: string;
    customRootClass?: string;
    variant?: string;
    size?: string;
    color?: string;
} & RadioGroupPrimitiveProps.Root;

const RadioGroupRoot = ({ children, className = '', customRootClass = '', variant = '', size = '', color = '', ...props }: RadioGroupRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const dataAttributes = useCreateDataAttribute('radio-group', { variant, size });
    const accentAttributes = useCreateDataAccentColorAttribute(color);
    const composedAttributes = useComposeAttributes(dataAttributes(), accentAttributes());

    return <RadioGroupContext.Provider value={{ rootClass }}>
        <RadioGroupPrimitive.Root className={clsx(`${rootClass}-root`, rootClass, className)} {...composedAttributes} {...props}> {children} </RadioGroupPrimitive.Root>
    </RadioGroupContext.Provider>;
};

export default RadioGroupRoot;
