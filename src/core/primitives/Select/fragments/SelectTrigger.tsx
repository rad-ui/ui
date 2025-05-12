import React, { useContext } from 'react';
import { SelectContext } from '../contexts/SelectContext';
import Primitive from '../../Primitive';

export type SelectTriggerProps = {
    children: React.ReactNode
};
function SelectTrigger({children, ...props}: SelectTriggerProps) {
    const {isOpen, setIsOpen, selectedValue} = useContext(SelectContext);
    if (isOpen) return null;
    return (
        <Primitive.button onClick={() => setIsOpen(!isOpen)} {...props}>
            {selectedValue? selectedValue : children}
        </Primitive.button>
    );
}

export default SelectTrigger;