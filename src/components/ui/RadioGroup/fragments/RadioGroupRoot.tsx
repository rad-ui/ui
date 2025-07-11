import React from 'react';
import RadioGroupPrimitive, {RadioGroupPrimitiveTypes} from '~/core/primitives/RadioGroup/RadioGroupPrimitive';

import clsx from 'clsx';
import { customClassSwitcher } from '~/core';

import { RadioGroupContext } from '../context/RadioGroupContext';
import { useCreateDataAttribute, useComposeAttributes, useCreateDataAccentColorAttribute } from '~/core/hooks/createDataAttribute';


const COMPONENT_NAME = 'RadioGroup';

export type RadioGroupRootProps = {
  customRootClass?: string;
  children: React.ReactNode;
  variant?: string;
  color?: string;
  size?: string;
} & RadioGroupPrimitiveTypes.Root

const RadioGroupRoot = ({ children, className = '', customRootClass = '', variant = '', color = '', size = '', ...props }: RadioGroupRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const dataAttributes = useCreateDataAttribute('button', { variant, size });
        const accentAttributes = useCreateDataAccentColorAttribute(color);
        const composedAttributes = useComposeAttributes(dataAttributes(), accentAttributes());

    return <RadioGroupContext.Provider value={{ rootClass }}>
        <RadioGroupPrimitive.Root className={clsx(rootClass, className)} {...composedAttributes()} {...props}>{children}</RadioGroupPrimitive.Root>
    </RadioGroupContext.Provider>;
};

export default RadioGroupRoot;
