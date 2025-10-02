import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import CheckboxGroupPrimitive from '~/core/primitives/CheckboxGroup/CheckboxGroupPrimitive';
import CheckboxGroupRootContext from '../context/CheckboxGroupRootContext';
import { customClassSwitcher } from '~/core';
import clsx from 'clsx';
import { useCreateDataAttribute, useComposeAttributes, useCreateDataAccentColorAttribute } from '~/core/hooks/createDataAttribute';

const COMPONENT_NAME = 'CheckboxGroup';

export type CheckboxGroupRootElement = ElementRef<typeof CheckboxGroupPrimitive.Root>;
export type CheckboxGroupRootProps = {
    customRootClass?: string;
    color?: string;
    variant?: string;
    size?: string;
} & ComponentPropsWithoutRef<typeof CheckboxGroupPrimitive.Root>;

const CheckboxGroupRoot = forwardRef<CheckboxGroupRootElement, CheckboxGroupRootProps>(({ children, customRootClass = '', className = '', color = '', variant = '', size = '', ...props }, ref) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const dataAttributes = useCreateDataAttribute('checkbox-group', { variant, size });
    const accentAttributes = useCreateDataAccentColorAttribute(color);
    const composedAttributes = useComposeAttributes(dataAttributes(), accentAttributes());

    return (
        <CheckboxGroupRootContext.Provider value={{ rootClass }}>
            <CheckboxGroupPrimitive.Root ref={ref} className={clsx(`${rootClass}-root`, rootClass, className)} {...props} {...composedAttributes()}>

                {children}
            </CheckboxGroupPrimitive.Root>
        </CheckboxGroupRootContext.Provider>

    );
});

CheckboxGroupRoot.displayName = COMPONENT_NAME;

export default CheckboxGroupRoot;
