import React from 'react';
import CheckboxPrimitiveRoot, { CheckboxPrimitiveRootProps } from '~/core/primitives/Checkbox/fragments/CheckboxPrimitiveRoot';
import { customClassSwitcher } from '~/core';
import CheckboxContext from '../context/CheckboxContext';
import { clsx } from 'clsx';    
import { useCreateDataAttribute, useComposeAttributes, useCreateDataAccentColorAttribute } from '~/core/hooks/createDataAttribute';

const COMPONENT_NAME = 'Checkbox';

export type CheckboxRootProps = {
    customRootClass?: string;
    color?: string;
    variant?: string;
    size?: string;
} & CheckboxPrimitiveRootProps

const CheckboxRoot = ({ children, className = '', customRootClass, color = '', variant, size, ...props }: CheckboxRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const dataAttributes = useCreateDataAttribute('checkbox', { variant, size });
    const accentAttributes = useCreateDataAccentColorAttribute(color);
    const composedAttributes = useComposeAttributes(dataAttributes(), accentAttributes());

    return <CheckboxContext.Provider value={{ rootClass }}>
        <CheckboxPrimitiveRoot className={clsx(rootClass, className)} {...props} {...composedAttributes()}>
            {children}
        </CheckboxPrimitiveRoot>
    </CheckboxContext.Provider>;
};

export default CheckboxRoot;
