import React from 'react';
import SelectPrimitive from '~/core/primitives/Select/Select';
import { customClassSwitcher } from '~/core/customClassSwitcher';

const COMPONENT_NAME = 'Select';

function SelectTrigger({ customRootClass, children, disabled, placeholder, ...props }: any) {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    return (
        <SelectPrimitive.Trigger 
            className={`${rootClass}-trigger`} 
            aria-disabled={disabled ? 'true' : undefined}
            data-placeholder={placeholder ? '' : undefined}
            {...props}
        >
            <span className={`${rootClass}-value`}>
                {children}
            </span>
        </SelectPrimitive.Trigger>
    );
}

export default SelectTrigger;