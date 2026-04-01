import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import CheckboxPrimitiveRoot from '~/core/primitives/Checkbox/fragments/CheckboxPrimitiveRoot';
import { customClassSwitcher } from '~/core';
import CheckboxContext from '../context/CheckboxContext';
import clsx from 'clsx';
import { createDataAttributes, composeAttributes, createDataAccentColorAttribute } from '~/core/hooks/createDataAttribute';

const COMPONENT_NAME = 'Checkbox';

export type CheckboxRootElement = ElementRef<typeof CheckboxPrimitiveRoot>;
export type CheckboxRootProps = {
    customRootClass?: string;
    color?: string;
    variant?: string;
    size?: string;
} & ComponentPropsWithoutRef<typeof CheckboxPrimitiveRoot>;

const CheckboxRoot = forwardRef<CheckboxRootElement, CheckboxRootProps>(({ children, className = '', customRootClass, color = '', variant, size, ...props }, ref) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const dataAttributes = createDataAttributes('checkbox', { variant, size });
    const accentAttributes = createDataAccentColorAttribute(color);
    const composedAttributes = composeAttributes(dataAttributes, accentAttributes);

    return <CheckboxContext.Provider value={{ rootClass }}>
        <CheckboxPrimitiveRoot ref={ref} className={clsx(rootClass, className)} {...props} {...composedAttributes}>
            {children}
        </CheckboxPrimitiveRoot>
    </CheckboxContext.Provider>;
});

CheckboxRoot.displayName = COMPONENT_NAME;

export default CheckboxRoot;
