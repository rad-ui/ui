'use client';
import React, { useContext } from 'react';
import { SelectPrimitiveContext } from '../contexts/SelectPrimitiveContext';
import Floater from '../../Floater';

export type SelectPrimitiveTriggerProps = {
    children: React.ReactNode;
    className?: string;
    [key: string]: any;
};

const SelectPrimitiveTrigger = React.forwardRef<
    React.ElementRef<'button'>,
    SelectPrimitiveTriggerProps & React.ComponentPropsWithoutRef<'button'>
>(({ children, className, ...props }, forwardedRef) => {
    const { isOpen, setIsOpen, selectedLabel, refs, getReferenceProps } = useContext(SelectPrimitiveContext);
    return (
        <button
            type='button'
            onClick={() => setIsOpen(!isOpen)}
            className={className}
            aria-expanded={isOpen}
            ref={Floater.useMergeRefs([refs.setReference, forwardedRef])}
            {...getReferenceProps()}
            role='combobox'
            {...props}>
            {selectedLabel || children}
        </button>
    );
});

SelectPrimitiveTrigger.displayName = 'SelectPrimitiveTrigger';

export default SelectPrimitiveTrigger;
