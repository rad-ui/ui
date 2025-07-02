'use client';

import React, { useContext } from 'react';
import { SelectPrimitiveContext } from '../contexts/SelectPrimitiveContext';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import Primitive from '../../Primitive';

interface SelectPrimitiveItemProps {
    children: React.ReactNode;
    value: string;
    disabled?: boolean
}

function SelectPrimitiveItem({ children, value, disabled, ...props }: SelectPrimitiveItemProps) {
    const { handleSelect, selectedValue, getItemProps, selectedItemRef, activeItemValue } = useContext(SelectPrimitiveContext);
    const [isFocused , setIsFocused] = React.useState(false);
    return (
        <RovingFocusGroup.Item
            role='option'
            onFocus={e => {
      
                setIsFocused(true);
            }}
            onBlur={e => {
                setIsFocused(false);
            }}
        >
            <Primitive.div
                disabled={disabled} data-value={value}
                aria-selected= {value === selectedValue}
                data-active={activeItemValue === value || isFocused}
                onClick={() => handleSelect(value)} {...props}
                {...getItemProps()}
                ref={value === selectedValue ? selectedItemRef : undefined}
            >
                {children}
            </Primitive.div>
        </RovingFocusGroup.Item>
    );
}

export default SelectPrimitiveItem;
