import React, { useContext } from 'react';
import Primitive from '../../Primitive';
import { SelectContext } from '../contexts/SelectContext';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import ButtonPrimitive from '../../Button';

interface SelectItemProps {
    children: React.ReactNode;
    value: string;
    disabled?: boolean
}

function SelectItem({children, value, disabled, ...props}: SelectItemProps) {
    const { handleSelect} = useContext(SelectContext);
    return (
        <RovingFocusGroup.Item>
        <ButtonPrimitive  disabled={disabled} data-value={value} onClick={()=> handleSelect(value)} {...props}>
            {children}
        </ButtonPrimitive>
        </RovingFocusGroup.Item>
    );
}

export default SelectItem;