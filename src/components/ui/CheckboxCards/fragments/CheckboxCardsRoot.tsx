import React from 'react';
import CheckboxGroupPrimitive, { CheckboxGroupPrimitiveProps } from '~/core/primitives/CheckboxGroup/CheckboxGroupPrimitive';
import CheckboxCardsRootContext from '../context/CheckboxCardsRootContext';
import { customClassSwitcher } from '~/core';
import clsx from 'clsx';
import { useCreateDataAttribute, useComposeAttributes, useCreateDataAccentColorAttribute } from '~/core/hooks/createDataAttribute';

const COMPONENT_NAME = 'CheckboxCards';

export type CheckboxCardsRootProps = {
    children: React.ReactNode;
    className?: string
    customRootClass?: string
    color?: string
    variant?: string
    size?: string
    name?: string
}& CheckboxGroupPrimitiveProps.Root

const CheckboxCardsRoot = ({ children, customRootClass = '', className = '', color = '', variant = '', size = '', ...props }: CheckboxCardsRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const dataAttributes = useCreateDataAttribute('checkbox-cards', { variant, size });
    const accentAttributes = useCreateDataAccentColorAttribute(color);
    const composedAttributes = useComposeAttributes(dataAttributes(), accentAttributes());

    return (

        <CheckboxGroupPrimitive.Root className={clsx(`${rootClass}-root`, rootClass, className)} {...props} {...composedAttributes()}>
            <CheckboxCardsRootContext.Provider value={{ rootClass }}>

                {children}

            </CheckboxCardsRootContext.Provider>
        </CheckboxGroupPrimitive.Root>
    );
};

export default CheckboxCardsRoot;
