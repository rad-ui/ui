import React, { useContext } from 'react';
import { SelectPrimitiveContext } from '../contexts/SelectPrimitiveContext';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import ButtonPrimitive from '../../Button';

interface SelectPrimitiveItemProps {
    children: React.ReactNode;
    value: string;
    disabled?: boolean
}

function SelectPrimitiveItem({children, value, disabled, ...props}: SelectPrimitiveItemProps) {
    const { handleSelect, selectedValue} = useContext(SelectPrimitiveContext);
    
    return (
        <RovingFocusGroup.Item >
        <ButtonPrimitive  disabled={disabled} data-value={value} 
        aria-selected= {value===selectedValue ? true : false}
        onClick={()=> handleSelect(value)} {...props}>
            {children}
        </ButtonPrimitive>
        </RovingFocusGroup.Item>
    );
}

export default SelectPrimitiveItem;