import React from 'react';
import SelectPrimitive from '~/core/primitives/Select/Select';
import { customClassSwitcher } from '~/core/customClassSwitcher';

const COMPONENT_NAME = 'Select';

function SelectItem({ customRootClass, children, value, disabled, ...props }: any) {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    return (
        <SelectPrimitive.Item 
            className={`${rootClass}-item`} 
            value={value} 
            disabled={disabled}
            data-disabled={disabled ? '' : undefined}
            role="option"
            aria-disabled={disabled ? 'true' : undefined}
            {...props}
        >
            {/* <div className={`${rootClass}-item-indicator`}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.3332 4L5.99984 11.3333L2.6665 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div> */}
            <span className={`${rootClass}-text`}>{children}</span>
        </SelectPrimitive.Item>
    );
}

export default SelectItem;