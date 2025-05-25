import React, { useContext } from 'react';
import { SelectPrimitiveContext } from '../contexts/SelectPrimitiveContext';
import Primitive from '../../Primitive';

export type SelectPrimitiveTriggerProps = {
    children: React.ReactNode
};
function SelectPrimitiveTrigger({ children, ...props }: SelectPrimitiveTriggerProps) {
    const { isOpen, setIsOpen, selectedValue, refs, getReferenceProps } = useContext(SelectPrimitiveContext);
    // if (isOpen) return null;
    return (
        <button
            onClick={() => setIsOpen(!isOpen)} {...props}
            aria-expanded={isOpen}
            ref={refs.setReference}
            {...getReferenceProps()}
            role='combobox'>
            {selectedValue || children}
        </button>
    );
}

export default SelectPrimitiveTrigger;
