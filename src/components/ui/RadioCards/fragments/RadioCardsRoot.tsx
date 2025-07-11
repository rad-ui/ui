import React from 'react';
import RadioGroupPrimitive, { RadioGroupPrimitiveTypes } from '~/core/primitives/RadioGroup/RadioGroupPrimitive';

import clsx from 'clsx';
import { customClassSwitcher } from '~/core';
import { useCreateDataAttribute, useComposeAttributes, useCreateDataAccentColorAttribute } from '~/core/hooks/createDataAttribute';

import { RadioCardsContext } from '../context/RadioCardsContext';

const COMPONENT_NAME = 'RadioCards';

type RadioCardsRootProps = {
    children: React.ReactNode;
    className?: string;
    customRootClass?: string;
    size?: string;
    color?: string;
    variant?: string;
}& RadioGroupPrimitiveTypes.Root

const RadioCardsRoot = ({ children, className = '', customRootClass = '', size = '', color = '', variant = '', ...props }: RadioCardsRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const dataAttributes = useCreateDataAttribute('button', { variant, size });
    const accentAttributes = useCreateDataAccentColorAttribute(color);
    const composedAttributes = useComposeAttributes(dataAttributes(), accentAttributes());

    return <RadioCardsContext.Provider value={{ rootClass }}>
        <RadioGroupPrimitive.Root className={clsx(rootClass, className)} {...composedAttributes()} {...props}>{children}</RadioGroupPrimitive.Root>
    </RadioCardsContext.Provider>;
};

export default RadioCardsRoot;
