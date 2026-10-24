'use client';
import clsx from 'clsx';
import React, { useContext } from 'react';
import ComboboxPrimitive from '~/core/primitives/Combobox/ComboboxPrimitive';
import { SelectRootContext } from '../contexts/SelectRootContext';

export type SelectValueProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Value>;

/** The selected item's label (or a placeholder) inside Select.Trigger. */
const SelectValue = React.forwardRef<HTMLSpanElement, SelectValueProps>(({ className, ...props }, ref) => {
    const { rootClass } = useContext(SelectRootContext);
    return (
        <ComboboxPrimitive.Value
            ref={ref}
            className={clsx(rootClass ? `${rootClass}-value` : undefined, className) || undefined}
            data-slot="select-value"
            {...props}
        />
    );
});

SelectValue.displayName = 'SelectValue';
// Keep the marker so a wrapped Value still tells the trigger to keep its children.
(SelectValue as unknown as Record<string, boolean>).__radComboboxValuePart = true;

export default SelectValue;
