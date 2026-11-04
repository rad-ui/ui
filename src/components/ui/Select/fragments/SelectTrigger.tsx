'use client';
import clsx from 'clsx';
import React, { useContext } from 'react';
import ComboboxPrimitive from '~/core/primitives/Combobox/ComboboxPrimitive';

import { SelectRootContext } from '../contexts/SelectRootContext';
import FieldContext from '~/components/ui/Field/contexts/FieldContext';
import composeEventHandlers from '~/core/hooks/composeEventHandlers';

type SelectTriggerElement = React.ElementRef<typeof ComboboxPrimitive.Trigger>;
export type SelectTriggerProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Trigger> & {
    customRootClass?: string;
    placeholder?: boolean;
};

const SelectTrigger = React.forwardRef<SelectTriggerElement, SelectTriggerProps>(({ customRootClass, children, className, disabled, placeholder, onFocus, onBlur, ...props }, forwardedRef) => {
    const { rootClass, triggerId, labelId, hasLabel, onFieldFocus, onFieldBlur, fieldStateAttributes } = useContext(SelectRootContext);
    // Inside Field.Root, the trigger is the labelled control.
    const field = useContext(FieldContext);
    const fieldProps = field ? {
        id: (props as { id?: string }).id ?? field.controlId,
        'aria-describedby': [(props as { 'aria-describedby'?: string })['aria-describedby'], field.describedBy].filter(Boolean).join(' ') || undefined,
        'aria-invalid': (props as { 'aria-invalid'?: boolean })['aria-invalid'] ?? (field.invalid || undefined)
    } : {};
    const isDisabled = disabled ?? (field?.disabled || undefined);
    // A Select.Label names the trigger; screen readers read the shown value as the combobox's value.
    const ownProps = props as { id?: string; 'aria-labelledby'?: string };
    const resolvedId = ownProps.id ?? field?.controlId ?? triggerId;
    const labelProps = hasLabel && !field ? {
        id: resolvedId,
        'aria-labelledby': ownProps['aria-labelledby'] ?? labelId
    } : !field && triggerId ? { id: resolvedId } : {};

    return (
        <ComboboxPrimitive.Trigger
            className={clsx(rootClass ? `${rootClass}-trigger` : undefined, className) || undefined}
            aria-disabled={isDisabled ? 'true' : undefined}
            data-placeholder={placeholder ? '' : undefined}
            data-slot="select-trigger"
            disabled={isDisabled}
            ref={forwardedRef}
            {...fieldStateAttributes}
            {...props}
            {...labelProps}
            {...fieldProps}
            onFocus={composeEventHandlers(onFocus, onFieldFocus)}
            onBlur={composeEventHandlers(onBlur, onFieldBlur)}
        >

            {children}

        </ComboboxPrimitive.Trigger>
    );
});

SelectTrigger.displayName = 'SelectTrigger';

export default SelectTrigger;
