'use client';
import React, { useContext } from 'react';
import { SelectPrimitiveContext } from '../contexts/SelectPrimitiveContext';

export type SelectPrimitiveTriggerProps = {
    children: React.ReactNode;
    className?: string;
    [key: string]: any;
};
function SelectPrimitiveTrigger({ children, className, ...props }: SelectPrimitiveTriggerProps) {
    const { isOpen, setIsOpen, selectedLabel, refs, getReferenceProps } = useContext(SelectPrimitiveContext);
    return (
        <button
            onClick={() => setIsOpen(!isOpen)}
            className={className}
            aria-expanded={isOpen}
            ref={refs.setReference}
            {...getReferenceProps()}
            role='combobox'
            {...props}>
            {selectedLabel || children}
        </button>
    );
}

export default SelectPrimitiveTrigger;
