'use client';
import React, { useContext } from 'react';
import { SelectPrimitiveContext } from '../contexts/SelectPrimitiveContext';
import Floater from '../../Floater';
import Primitive from '../../Primitive';

export type SelectPrimitiveTriggerProps = {
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    [key: string]: any;
};

const SelectPrimitiveTrigger = React.forwardRef<
    React.ElementRef<typeof Primitive.button>,
    SelectPrimitiveTriggerProps & React.ComponentPropsWithoutRef<typeof Primitive.button>
>(({ children, className, disabled, asChild, ...props }, forwardedRef) => {
    const { isOpen, setIsOpen, selectedLabel, refs, getReferenceProps } = useContext(SelectPrimitiveContext);

    return (
        <Primitive.button
            type={asChild ? undefined : 'button'}
            onClick={() => { if (!disabled) setIsOpen(!isOpen); }}
            className={className}
            aria-expanded={isOpen}
            data-state={isOpen ? 'open' : 'closed'}
            aria-disabled={disabled ? true : undefined}
            disabled={disabled ? true : undefined}
            ref={Floater.useMergeRefs([refs.setReference, forwardedRef])}
            {...getReferenceProps()}
            role='combobox'
            asChild={asChild}
            {...props}
        >
            {selectedLabel || children}
        </Primitive.button>
    );
});

SelectPrimitiveTrigger.displayName = 'SelectPrimitiveTrigger';

export default SelectPrimitiveTrigger;
