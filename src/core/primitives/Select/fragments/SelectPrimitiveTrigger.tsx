'use client';
import React, { useContext } from 'react';
import { SelectPrimitiveContext } from '../contexts/SelectPrimitiveContext';
import Floater from '../../Floater';
import Primitive from '../../Primitive';
import composeEventHandlers from '~/core/hooks/composeEventHandlers';

export type SelectPrimitiveTriggerProps = {
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    [key: string]: any;
};

const SelectPrimitiveTrigger = React.forwardRef<
    React.ElementRef<typeof Primitive.button>,
    SelectPrimitiveTriggerProps & React.ComponentPropsWithoutRef<typeof Primitive.button>
>(({ children, className, disabled, asChild, onClick, ...props }, forwardedRef) => {
    const { isOpen, setIsOpen, selectedLabel, refs, getReferenceProps } = useContext(SelectPrimitiveContext);

    const { onClick: _refOnClick, ...refProps } = getReferenceProps();

    const handleClick = composeEventHandlers(onClick, () => {
        if (!disabled) {
            setIsOpen(prev => !prev);
        }
    });

    return (
        <Primitive.button
            type={asChild ? undefined : 'button'}
            className={className}
            aria-expanded={isOpen}
            data-state={isOpen ? 'open' : 'closed'}
            aria-disabled={disabled ? true : undefined}
            disabled={disabled ? true : undefined}
            ref={Floater.useMergeRefs([refs.setReference, forwardedRef])}
            role='combobox'
            asChild={asChild}
            onClick={handleClick}
            {...refProps}
            {...props}
        >
            {selectedLabel || children}
        </Primitive.button>
    );
});

SelectPrimitiveTrigger.displayName = 'SelectPrimitiveTrigger';

export default SelectPrimitiveTrigger;
