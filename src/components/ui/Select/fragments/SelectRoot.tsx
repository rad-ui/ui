import React, { useState, useCallback } from 'react';
import SelectPrimitive from '~/core/primitives/Select/Select';
import { customClassSwitcher } from '~/core/customClassSwitcher';

const COMPONENT_NAME = 'Select';

function SelectRoot({ customRootClass, children, defaultValue, value, onValueChange, ...props }: any) {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    return (

        <SelectPrimitive.Root
            className={`${rootClass}-root`}
            defaultValue={defaultValue}
            value={value}
            onValueChange={onValueChange}
            {...props}
        >
            {children}
        </SelectPrimitive.Root>

    );
}

export default SelectRoot;
