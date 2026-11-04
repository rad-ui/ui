'use client';
import React, { useContext } from 'react';
import Primitive from '../../Primitive';
import { ComboboxPrimitiveContext } from '../contexts/ComboboxPrimitiveContext';

export const COMBOBOX_VALUE_PART = '__radComboboxValuePart' as const;

export type ComboboxPrimitiveValueProps = Omit<React.ComponentPropsWithoutRef<typeof Primitive.span>, 'children'> & {
    /** Shown while nothing is selected. */
    placeholder?: React.ReactNode;
    /** Custom display from the selected value and its label. */
    children?: (value: string, label: string) => React.ReactNode;
};

/**
 * The selected item's label inside a trigger. With a Value part, the trigger
 * keeps all its own children (icons, prefixes) instead of being replaced by
 * the label once something is selected.
 */
const ComboboxPrimitiveValue = React.forwardRef<HTMLSpanElement, ComboboxPrimitiveValueProps>(({ placeholder, children, ...props }, ref) => {
    const { selectedValue, selectedLabel } = useContext(ComboboxPrimitiveContext);
    const hasValue = Boolean(selectedValue || selectedLabel);
    const label = selectedLabel || selectedValue;
    return (
        <Primitive.span ref={ref} data-placeholder={hasValue ? undefined : ''} {...props}>
            {hasValue ? (children ? children(selectedValue, label) : label) : placeholder}
        </Primitive.span>
    );
});

ComboboxPrimitiveValue.displayName = 'ComboboxPrimitiveValue';
(ComboboxPrimitiveValue as unknown as Record<string, boolean>)[COMBOBOX_VALUE_PART] = true;

export default ComboboxPrimitiveValue;
