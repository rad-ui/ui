import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import CheckboxGroupPrimitive from '~/core/primitives/CheckboxGroup/CheckboxGroupPrimitive';
import CheckboxGroupRootContext from '../context/CheckboxGroupRootContext';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import clsx from 'clsx';
import { createDataAttributes, composeAttributes, createDataAccentColorAttribute } from '~/core/hooks/createDataAttribute';

const COMPONENT_NAME = 'CheckboxGroup';

export type CheckboxGroupRootElement = ElementRef<typeof CheckboxGroupPrimitive.Root>;
export type CheckboxGroupRootProps = {
    customRootClass?: string;
    color?: string;
    variant?: string;
    size?: string;
} & ComponentPropsWithoutRef<typeof CheckboxGroupPrimitive.Root>;

const CheckboxGroupRoot = forwardRef<CheckboxGroupRootElement, CheckboxGroupRootProps>(({ children, customRootClass = '', className = '', color = '', variant = '', size = '', ...props }, ref) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);

    const dataAttributes = createDataAttributes('checkbox-group', { variant, size });
    const accentAttributes = createDataAccentColorAttribute(color);
    const composedAttributes = composeAttributes(dataAttributes, accentAttributes);

    return (
        <CheckboxGroupRootContext.Provider value={{ rootClass }}>
            <CheckboxGroupPrimitive.Root ref={ref} className={clsx(rootClass && `${rootClass}-root`, rootClass, className)} {...props} {...composedAttributes}>

                {children}
            </CheckboxGroupPrimitive.Root>
        </CheckboxGroupRootContext.Provider>

    );
});

CheckboxGroupRoot.displayName = COMPONENT_NAME;

export default CheckboxGroupRoot;
