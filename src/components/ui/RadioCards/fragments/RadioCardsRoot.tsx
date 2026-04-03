import React, { forwardRef, ElementRef } from 'react';
import RadioGroupPrimitive from '~/core/primitives/RadioGroup/RadioGroupPrimitive';
import RadioGroupPrimitiveRoot, { RadioGroupPrimitiveRootProps } from '~/core/primitives/RadioGroup/fragments/RadioGroupPrimitiveRoot';

import clsx from 'clsx';
import { customClassSwitcher } from '~/core';
import { createDataAttributes, composeAttributes, createDataAccentColorAttribute } from '~/core/hooks/createDataAttribute';
import { RadioCardsContext } from '../context/RadioCardsContext';

const COMPONENT_NAME = 'RadioCards';

export type RadioCardsRootElement = ElementRef<typeof RadioGroupPrimitiveRoot>;

export type RadioCardsRootProps = RadioGroupPrimitiveRootProps & {
    children: React.ReactNode;
    className?: string;
    customRootClass?: string;
    variant?: string;
    size?: string;
    color?: string;
    name?: string;
    defaultValue?: string;
};
const RadioCardsRoot = forwardRef<RadioCardsRootElement, RadioCardsRootProps>(
    (
        {
            children,
            className = '',
            customRootClass = '',
            variant = '',
            size = '',
            color = '',
            orientation = 'both',
            ...props
        },
        ref
    ) => {
        const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

        const dataAttributes = createDataAttributes('radio-cards', { variant, size });
        const accentAttributes = createDataAccentColorAttribute(color);
        const composedAttributes = composeAttributes(dataAttributes, accentAttributes);

        return <RadioCardsContext.Provider value={{ rootClass }}>
            <RadioGroupPrimitive.Root
                ref={ref}
                className={clsx(rootClass, className)}
                {...composedAttributes}
                orientation={orientation}
                {...props}
            >
                {children}
            </RadioGroupPrimitive.Root>
        </RadioCardsContext.Provider>;
    }
);

RadioCardsRoot.displayName = 'RadioCardsRoot';

export default RadioCardsRoot;
