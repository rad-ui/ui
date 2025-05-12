import React, { useContext } from 'react';
import { SelectPrimitiveContext } from '../contexts/SelectPrimitiveContext';
import Primitive from '../../Primitive';

export type SelectPrimitiveTriggerProps = {
    children: React.ReactNode
};
function SelectPrimitiveTrigger({children, ...props}: SelectPrimitiveTriggerProps) {
    const {isOpen, setIsOpen, selectedValue} = useContext(SelectPrimitiveContext);
    if (isOpen) return null;
    return (
        <Primitive.button onClick={() => setIsOpen(!isOpen)} {...props}>
            {selectedValue? selectedValue : children}
        </Primitive.button>
    );
}

export default SelectPrimitiveTrigger;