'use client';
import React, { useContext } from 'react';
import { ComboboxPrimitiveContext } from '../contexts/ComboboxPrimitiveContext';
import Floater from '../../Floater';
import Primitive from '../../Primitive';
import composeEventHandlers from '~/core/hooks/composeEventHandlers';

export type ComboboxPrimitiveTriggerProps = {
    children?: React.ReactNode;
    className?: string;
    disabled?: boolean;
    renderValue?: (value: string, label: string) => React.ReactNode;
    [key: string]: any;
};

const ComboboxPrimitiveTrigger = React.forwardRef<
    React.ElementRef<typeof Primitive.button>,
    ComboboxPrimitiveTriggerProps & React.ComponentPropsWithoutRef<typeof Primitive.button>
>(({ children, className, disabled, asChild, onClick, renderValue, ...props }, forwardedRef) => {
    const { isOpen, setIsOpen, selectedLabel, selectedValue, refs, getReferenceProps } = useContext(ComboboxPrimitiveContext);

    const { onClick: _refOnClick, ...refProps } = getReferenceProps();

    const handleClick = composeEventHandlers(onClick, () => {
        if (!disabled) {
            setIsOpen(prev => !prev);
        }
    });
    const hasSelectedValue = Boolean(selectedLabel || selectedValue);
    const renderedValue = hasSelectedValue
        ? renderValue?.(selectedValue, selectedLabel || selectedValue)
        : undefined;

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
            {renderedValue ?? (selectedLabel || selectedValue || children)}
        </Primitive.button>
    );
});

ComboboxPrimitiveTrigger.displayName = 'ComboboxPrimitiveTrigger';

export default ComboboxPrimitiveTrigger;
