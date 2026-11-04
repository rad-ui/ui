'use client';
import clsx from 'clsx';
import React, { useContext } from 'react';
import ComboboxPrimitive from '~/core/primitives/Combobox/ComboboxPrimitive';
import { ComboboxRootContext } from '../contexts/ComboboxRootContext';

export type ComboboxValueProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Value>;

/** The selected item's label (or a placeholder) inside Combobox.Trigger. */
const ComboboxValue = React.forwardRef<HTMLSpanElement, ComboboxValueProps>(({ className, ...props }, ref) => {
    const { rootClass } = useContext(ComboboxRootContext);
    return (
        <ComboboxPrimitive.Value
            ref={ref}
            className={clsx(rootClass ? `${rootClass}-value` : undefined, className) || undefined}
            data-slot="combobox-value"
            {...props}
        />
    );
});

ComboboxValue.displayName = 'ComboboxValue';
// Keep the marker so a wrapped Value still tells the trigger to keep its children.
(ComboboxValue as unknown as Record<string, boolean>).__radComboboxValuePart = true;

export default ComboboxValue;
