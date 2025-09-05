'use client';
import React, { useContext } from 'react';
import Floater from '../../Floater';
import { SelectPrimitiveContext } from '../contexts/SelectPrimitiveContext';

export type SelectPrimitiveTriggerProps = React.ComponentPropsWithoutRef<'button'> & {
    children: React.ReactNode;
    className?: string;
};

const SelectPrimitiveTrigger = React.forwardRef<React.ElementRef<'button'>, SelectPrimitiveTriggerProps>(
    ({ children, className, ...props }, ref) => {
        const { isOpen, setIsOpen, selectedLabel, refs, getReferenceProps } = useContext(SelectPrimitiveContext);
        return (
            <button
                type='button'
                onClick={() => setIsOpen(!isOpen)}
                className={className}
                aria-expanded={isOpen}
                ref={Floater.useMergeRefs([refs.setReference, ref])}
                {...getReferenceProps()}
                role='combobox'
                {...props}>
                {selectedLabel || children}
            </button>
        );
    }
);

SelectPrimitiveTrigger.displayName = 'SelectPrimitiveTrigger';

export default SelectPrimitiveTrigger;
