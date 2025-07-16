import React from 'react';
import CheckboxGroupPrimitive, { CheckboxGroupPrimitiveProps } from '~/core/primitives/CheckboxGroup/CheckboxGroupPrimitive';
import CheckboxGroupContext from '../context/CheckboxGroupContext';
import { customClassSwitcher } from '~/core';
import clsx from 'clsx';
import { useCreateDataAttribute, useComposeAttributes, useCreateDataAccentColorAttribute } from '~/core/hooks/createDataAttribute';

const COMPONENT_NAME = 'CheckboxGroup';

export type CheckboxGroupRootProps = {
    children: React.ReactNode;
    className?: string
    customRootClass?: string
    color?: string
    variant?: string
    size?: string
    name?: string
}& CheckboxGroupPrimitiveProps.Root

const CheckboxGroupRoot = ({ children, customRootClass = '', className ='', color = '', variant = '', size = '', ...props }: CheckboxGroupRootProps) => {

    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const dataAttributes = useCreateDataAttribute('checkbox-group', { variant, size });
    const accentAttributes = useCreateDataAccentColorAttribute(color);
    const composedAttributes = useComposeAttributes(dataAttributes(), accentAttributes());

    return (

            <CheckboxGroupPrimitive.Root className={clsx(`${rootClass}-root`, rootClass, className)} {...props} {...composedAttributes()}>
                <CheckboxGroupContext.Provider value={{ rootClass }}>
                    
                        {children}
                    
                </CheckboxGroupContext.Provider>
           </CheckboxGroupPrimitive.Root>
    );
};

export default CheckboxGroupRoot;
