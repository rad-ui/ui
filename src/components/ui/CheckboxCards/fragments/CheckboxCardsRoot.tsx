import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import CheckboxGroupPrimitive from '~/core/primitives/CheckboxGroup/CheckboxGroupPrimitive';
import CheckboxCardsRootContext from '../context/CheckboxCardsRootContext';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import clsx from 'clsx';
import { createDataAttributes, composeAttributes, createDataAccentColorAttribute } from '~/core/hooks/createDataAttribute';

const COMPONENT_NAME = 'CheckboxCards';

export type CheckboxCardsRootElement = ElementRef<typeof CheckboxGroupPrimitive.Root>;
export type CheckboxCardsRootProps = {
    customRootClass?: string;
    color?: string;
    variant?: string;
    size?: string;
} & ComponentPropsWithoutRef<typeof CheckboxGroupPrimitive.Root>;

const CheckboxCardsRoot = forwardRef<CheckboxCardsRootElement, CheckboxCardsRootProps>(
    ({ children, customRootClass = '', className = '', color = '', variant = '', size = '', orientation = 'both', ...props }, ref) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);

    const dataAttributes = createDataAttributes('checkbox-cards', { variant, size });
    const accentAttributes = createDataAccentColorAttribute(color);
    const composedAttributes = composeAttributes(dataAttributes, accentAttributes);

    return (
        <CheckboxCardsRootContext.Provider value={{ rootClass }}>
            <CheckboxGroupPrimitive.Root
                ref={ref}
                className={clsx(rootClass && `${rootClass}-root`, rootClass, className)}
                {...props}
                {...composedAttributes}
                orientation={orientation}
            >

                {children}

            </CheckboxGroupPrimitive.Root>
        </CheckboxCardsRootContext.Provider>
    );
});

CheckboxCardsRoot.displayName = COMPONENT_NAME;

export default CheckboxCardsRoot;
