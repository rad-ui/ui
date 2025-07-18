import React from 'react';
import RadioGroupPrimitive, { RadioGroupPrimitiveProps } from '~/core/primitives/RadioGroup/RadioGroupPrimitive';

import clsx from 'clsx';
import { customClassSwitcher } from '~/core';

import { RadioCardsContext } from '../context/RadioCardsContext';

const COMPONENT_NAME = 'RadioCards';

type RadioCardsRootProps = {
    children: React.ReactNode;
    className?: string;
    customRootClass?: string;
} & RadioGroupPrimitiveProps.Root;

const RadioCardsRoot = ({ children, className = '', customRootClass = '' }: RadioCardsRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    return <RadioCardsContext.Provider value={{ rootClass }}>
        <RadioGroupPrimitive.Root className={clsx(rootClass, className)}>{children}</RadioGroupPrimitive.Root>
    </RadioCardsContext.Provider>;
};

export default RadioCardsRoot;
