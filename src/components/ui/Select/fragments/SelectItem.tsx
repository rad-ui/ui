'use client';
import React, { useContext } from 'react';
import SelectPrimitive from '~/core/primitives/Select/Select';
import { SelectRootContext } from '../contexts/SelectRootContext';

function SelectItem({ customRootClass, children, value, disabled, ...props }: any) {
    const { rootClass } = useContext(SelectRootContext);

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
            <span className={`${rootClass}-text`}>{children}</span>
        </SelectPrimitive.Item>
    );
}

export default SelectItem;
