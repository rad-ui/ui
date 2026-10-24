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
    /**
     * Custom display for the selected value. With `multiple`, it receives the
     * arrays of values and labels instead.
     */
    renderValue?: (value: string & string[], label: string & string[]) => React.ReactNode;
    [key: string]: any;
};

const ComboboxPrimitiveTrigger = React.forwardRef<
    React.ElementRef<typeof Primitive.button>,
    ComboboxPrimitiveTriggerProps & React.ComponentPropsWithoutRef<typeof Primitive.button>
>(({ children, className, disabled, asChild, onClick, renderValue, 'aria-disabled': ariaDisabled, 'data-placeholder': dataPlaceholder, ...props }, forwardedRef) => {
    const { isOpen, selectedLabel, selectedValue, refs, getReferenceProps, disabled: rootDisabled, multiple, selectedValues, selectedLabels } = useContext(ComboboxPrimitiveContext);
    const isDisabled = Boolean(disabled || rootDisabled);

    const handleClick = composeEventHandlers(onClick);
    const hasSelectedValue = multiple ? selectedValues.length > 0 : Boolean(selectedLabel || selectedValue);
    const renderedValue = !hasSelectedValue
        ? undefined
        : multiple
            ? (renderValue as ((value: string[], label: string[]) => React.ReactNode) | undefined)?.(selectedValues, selectedLabels) ?? selectedLabels.join(', ')
            : (renderValue as ((value: string, label: string) => React.ReactNode) | undefined)?.(selectedValue, selectedLabel || selectedValue);

    return (
        <Primitive.button
            type={asChild ? undefined : 'button'}
            className={className}
            aria-expanded={isOpen}
            data-state={isOpen ? 'open' : 'closed'}
            aria-disabled={isDisabled ? true : ariaDisabled}
            disabled={isDisabled ? true : undefined}
            data-disabled={isDisabled ? '' : undefined}
            // Placeholder styling applies whenever no value is selected unless the consumer says otherwise.
            data-placeholder={dataPlaceholder ?? (hasSelectedValue ? undefined : '')}
            ref={Floater.useMergeRefs([refs.setReference, forwardedRef])}
            role='combobox'
            asChild={asChild}
            {...getReferenceProps({
                ...props,
                onClick: handleClick,
                disabled: isDisabled
            })}
        >
            {renderedValue ?? (selectedLabel || selectedValue || children)}
        </Primitive.button>
    );
});

ComboboxPrimitiveTrigger.displayName = 'ComboboxPrimitiveTrigger';

export default ComboboxPrimitiveTrigger;
