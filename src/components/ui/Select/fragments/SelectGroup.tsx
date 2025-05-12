import React from 'react';
import SelectPrimitive from '~/core/primitives/Select/Select';
import { customClassSwitcher } from '~/core/customClassSwitcher';

const COMPONENT_NAME = 'Select';

function SelectGroup({ customRootClass, children, label, ...props }: any) {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    return (
        <div className={`${rootClass}-group`} role="group" aria-labelledby={label ? `${label}-label` : undefined} {...props}>
            {label && (
                <div className={`${rootClass}-label`} id={`${label}-label`}>{label}</div>
            )}
            {children}
        </div>
    );
}

export default SelectGroup; 