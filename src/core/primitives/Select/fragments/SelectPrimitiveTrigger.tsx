'use client';
import React, { useContext } from 'react';
import { SelectPrimitiveContext } from '../contexts/SelectPrimitiveContext';

export type SelectPrimitiveTriggerProps = {
    children: React.ReactNode
};
function SelectPrimitiveTrigger({ children, ...props }: SelectPrimitiveTriggerProps) {
    const { isOpen, setIsOpen, selectedLabel, refs, getReferenceProps } = useContext(SelectPrimitiveContext);
    return (
        <button
            onClick={() => setIsOpen(!isOpen)} {...props}
            aria-expanded={isOpen}
            ref={refs.setReference}
            {...getReferenceProps()}
            role='combobox'>
            {selectedLabel || children}
        </button>
    );
}

export default SelectPrimitiveTrigger;
