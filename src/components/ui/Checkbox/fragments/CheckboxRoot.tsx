import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import CheckboxPrimitiveRoot from '~/core/primitives/Checkbox/fragments/CheckboxPrimitiveRoot';
import { customClassSwitcher } from '~/core';
import CheckboxContext from '../context/CheckboxContext';
import clsx from 'clsx';
import { useCreateDataAttribute, useComposeAttributes, useCreateDataAccentColorAttribute } from '~/core/hooks/createDataAttribute';

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

    const dataAttributes = useCreateDataAttribute('checkbox', { variant, size });
    const accentAttributes = useCreateDataAccentColorAttribute(color);
    const composedAttributes = useComposeAttributes(dataAttributes(), accentAttributes());

    return <CheckboxContext.Provider value={{ rootClass }}>
        <CheckboxPrimitiveRoot ref={ref} className={clsx(rootClass, className)} {...props} {...composedAttributes()}>
            {children}
        </CheckboxPrimitiveRoot>
    </CheckboxContext.Provider>;
});

CheckboxRoot.displayName = COMPONENT_NAME;

export default CheckboxRoot;
