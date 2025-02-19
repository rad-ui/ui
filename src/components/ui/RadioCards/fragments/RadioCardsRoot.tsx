import React from 'react';
import RadioGroupPrimitive from '~/core/primitives/RadioGroup/RadioGroupPrimitive';

import clsx from 'clsx';
import { customClassSwitcher } from '~/core';

import { RadioCardsContext } from '../context/RadioCardsContext';

const COMPONENT_NAME = 'RadioCards';

type RadioCardsRootProps = {
    children: React.ReactNode;
    className?: string;
    defaultChecked?: string | null;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    customRootClass?: string;
};

const RadioCardsRoot = ({ children, className = '', defaultChecked = null, onChange = null, customRootClass = '' }: RadioCardsRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    return <RadioCardsContext.Provider value={{ defaultChecked, rootClass, onChange }}>
        <RadioGroupPrimitive.Root className={clsx(rootClass, className)} customRootClass={customRootClass}>{children}</RadioGroupPrimitive.Root>
    </RadioCardsContext.Provider>;
};

export default RadioCardsRoot;
