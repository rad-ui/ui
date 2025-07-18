import React from 'react';
import RadioGroupPrimitive, { RadioGroupPrimitiveProps } from '~/core/primitives/RadioGroup/RadioGroupPrimitive';

import clsx from 'clsx';
import { customClassSwitcher } from '~/core';
import { useCreateDataAttribute, useComposeAttributes, useCreateDataAccentColorAttribute } from '~/core/hooks/createDataAttribute';
import { RadioCardsContext } from '../context/RadioCardsContext';

const COMPONENT_NAME = 'RadioCards';

type RadioCardsRootProps = {
    children: React.ReactNode;
    className?: string;
    customRootClass?: string;
    variant?: string;
    size?: string;
    color?: string;
} & RadioGroupPrimitiveProps.Root;

const RadioCardsRoot = ({ children, className = '', customRootClass = '', variant = '', size = '', color = '', ...props }: RadioCardsRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const dataAttributes = useCreateDataAttribute('radio-cards', { variant, size });
    const accentAttributes = useCreateDataAccentColorAttribute(color);
    const composedAttributes = useComposeAttributes(dataAttributes(), accentAttributes());

    return <RadioCardsContext.Provider value={{ rootClass }}>
        <RadioGroupPrimitive.Root className={clsx(rootClass, className)} {...composedAttributes} {...props}>{children}</RadioGroupPrimitive.Root>
    </RadioCardsContext.Provider>;
};

export default RadioCardsRoot;
