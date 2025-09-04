import React from 'react';
import CheckboxGroupPrimitive from '~/core/primitives/CheckboxGroup/CheckboxGroupPrimitive';
import CheckboxCardsRootContext from '../context/CheckboxCardsRootContext';
import { customClassSwitcher } from '~/core';
import clsx from 'clsx';
import { useCreateDataAttribute, useComposeAttributes, useCreateDataAccentColorAttribute } from '~/core/hooks/createDataAttribute';

const COMPONENT_NAME = 'CheckboxCards';

export type CheckboxCardsRootProps = React.ComponentPropsWithoutRef<typeof CheckboxGroupPrimitive.Root> & {
    customRootClass?: string;
    color?: string;
    variant?: string;
    size?: string;
};

const CheckboxCardsRoot = React.forwardRef<
    React.ElementRef<typeof CheckboxGroupPrimitive.Root>,
    CheckboxCardsRootProps
>(({ children, customRootClass = '', className = '', color = '', variant = '', size = '', ...props }, ref) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const dataAttributes = useCreateDataAttribute('checkbox-cards', { variant, size });
    const accentAttributes = useCreateDataAccentColorAttribute(color);
    const composedAttributes = useComposeAttributes(dataAttributes(), accentAttributes());

    return (
        <CheckboxGroupPrimitive.Root
            ref={ref}
            className={clsx(`${rootClass}-root`, rootClass, className)}
            {...props}
            {...composedAttributes()}
        >
            <CheckboxCardsRootContext.Provider value={{ rootClass }}>
                {children}
            </CheckboxCardsRootContext.Provider>
        </CheckboxGroupPrimitive.Root>
    );
});

CheckboxCardsRoot.displayName = COMPONENT_NAME;

export default CheckboxCardsRoot;
