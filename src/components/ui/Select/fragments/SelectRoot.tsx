import React, { useState, useCallback, useEffect } from 'react';
import SelectPrimitive from '~/core/primitives/Select/Select';
import { customClassSwitcher } from '~/core/customClassSwitcher';
import { SelectRootContext } from '../contexts/SelectRootContext';

const COMPONENT_NAME = 'Select';

function SelectRoot({ customRootClass, children, defaultValue, value, onValueChange, ...props }: any) {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const [selectedId, setSelectedId] = useState(null);
    console.log(selectedId)

    return (
        <SelectRootContext.Provider value={{ rootClass, selectedId, setSelectedId }}>
            <SelectPrimitive.Root
                className={`${rootClass}-root`}
                defaultValue={defaultValue}
                value={value}
                onValueChange={onValueChange}
                offsetValue={-(40*selectedId)}
                {...props}
            >
                {children}
            </SelectPrimitive.Root>
        </SelectRootContext.Provider>

    );
}

export default SelectRoot;
