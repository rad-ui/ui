import React, { useContext } from 'react';
import Primitive from '../../Primitive';
import { SelectContext } from '../contexts/SelectContext';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';

interface SelectItemProps {
    children: React.ReactNode;
    value: string;
}

function SelectItem({children, value}: SelectItemProps) {
    const { handleSelect} = useContext(SelectContext);
    return (
        <RovingFocusGroup.Item>
        <Primitive.div data-value={value} onClick={()=> handleSelect(value)}>
            {children}
        </Primitive.div>
        </RovingFocusGroup.Item>
    );
}

export default SelectItem;