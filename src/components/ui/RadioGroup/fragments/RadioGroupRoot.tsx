import React, { ComponentPropsWithoutRef, ElementRef } from 'react';
import RadioGroupPrimitive from '~/core/primitives/RadioGroup/RadioGroupPrimitive';

import clsx from 'clsx';
import { customClassSwitcher } from '~/core';

import { RadioGroupContext } from '../context/RadioGroupContext';

import { useCreateDataAttribute, useComposeAttributes, useCreateDataAccentColorAttribute } from '~/core/hooks/createDataAttribute';

const COMPONENT_NAME = 'RadioGroup';

export type RadioGroupRootElement = ElementRef<typeof RadioGroupPrimitive.Root>;

export type RadioGroupRootProps = ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> & {
    className?: string;
    customRootClass?: string;
    variant?: string;
    size?: string;
    color?: string;
};

const RadioGroupRoot = React.forwardRef<RadioGroupRootElement, RadioGroupRootProps>(({ children, className = '', customRootClass = '', variant = '', size = '', color = '', ...props }, forwardedRef) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const dataAttributes = useCreateDataAttribute('radio-group', { variant, size });

    const accentAttributes = useCreateDataAccentColorAttribute(color);
    const composedAttributes = useComposeAttributes(dataAttributes(), accentAttributes());

    return <RadioGroupContext.Provider value={{ rootClass }}>
        <RadioGroupPrimitive.Root ref={forwardedRef} className={clsx(`${rootClass}-root`, className)} {...composedAttributes()} {...props}> {children} </RadioGroupPrimitive.Root>
    </RadioGroupContext.Provider>;
});

RadioGroupRoot.displayName = 'RadioGroupRoot';

export default RadioGroupRoot;
