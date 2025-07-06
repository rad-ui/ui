import React from 'react';
import CheckboxPrimitiveRoot from '~/core/primitives/Checkbox/fragments/CheckboxPrimitiveRoot';
import { customClassSwitcher } from '~/core';
import CheckboxContext from '../context/CheckboxContext';
import { clsx } from 'clsx';

const COMPONENT_NAME = 'Checkbox';

const CheckboxRoot = ({ children, className = '', customRootClass, ...props }: CheckboxRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    return <CheckboxContext.Provider value={{ rootClass }}>
        <CheckboxPrimitiveRoot className={clsx(rootClass, className)} {...props}>
            {children}
        </CheckboxPrimitiveRoot>
    </CheckboxContext.Provider>;
};

export default CheckboxRoot;
