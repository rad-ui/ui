import React from 'react';
import SelectPrimitive from '~/core/primitives/Select/Select';
import { customClassSwitcher } from '~/core/customClassSwitcher';
import { SelectRootContext } from '../contexts/SelectRootContext';

const COMPONENT_NAME = 'Select';

function SelectRoot({ customRootClass, children, defaultValue, value, onValueChange, shift, ...props }: any) {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    return (
        <SelectRootContext.Provider value={{ rootClass }}>
            <SelectPrimitive.Root
                className={`${rootClass}-root`}
                defaultValue={defaultValue}
                value={value}
                onValueChange={onValueChange}
                shift={shift}
                {...props}
            >
                {children}
            </SelectPrimitive.Root>
        </SelectRootContext.Provider>

    );
}

export default SelectRoot;
