import React from 'react';
import RadioGroupPrimitive, { RadioGroupPrimitiveProps } from '~/core/primitives/RadioGroup/RadioGroupPrimitive';

import clsx from 'clsx';
import { customClassSwitcher } from '~/core';
import { useCreateDataAttribute, useComposeAttributes, useCreateDataAccentColorAttribute } from '~/core/hooks/createDataAttribute';
import { RadioCardsContext } from '../context/RadioCardsContext';

const COMPONENT_NAME = 'RadioCards';

export type RadioCardsRootElement = React.ElementRef<typeof RadioGroupPrimitive.Root>;

type RadioCardsRootProps = {
    children: React.ReactNode;
    className?: string;
    customRootClass?: string;
    variant?: string;
    size?: string;
    color?: string;
} & RadioGroupPrimitiveProps.Root;

const RadioCardsRoot = React.forwardRef<RadioCardsRootElement, RadioCardsRootProps>(
    ({ children, className = '', customRootClass = '', variant = '', size = '', color = '', ...props }, ref) => {
        const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

        const dataAttributes = useCreateDataAttribute('radio-cards', { variant, size });
        const accentAttributes = useCreateDataAccentColorAttribute(color);
        const composedAttributes = useComposeAttributes(dataAttributes(), accentAttributes());

        return <RadioCardsContext.Provider value={{ rootClass }}>
            <RadioGroupPrimitive.Root ref={ref} className={clsx(rootClass, className)} {...composedAttributes()} {...props}>{children}</RadioGroupPrimitive.Root>
        </RadioCardsContext.Provider>;
    }
);

RadioCardsRoot.displayName = 'RadioCardsRoot';

export default RadioCardsRoot;
