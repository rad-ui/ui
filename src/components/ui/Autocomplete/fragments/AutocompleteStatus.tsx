'use client';
import clsx from 'clsx';
import React, { useContext } from 'react';
import ComboboxPrimitive from '~/core/primitives/Combobox/ComboboxPrimitive';
import { markAsComboboxSearchPart } from '~/core/primitives/Combobox/contexts/ComboboxSearchPart';
import { AutocompleteRootContext } from '../contexts/AutocompleteRootContext';

export type AutocompleteStatusProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Status>;

/** Announces how many options match as the user types ("3 results"). Pass a function to word it. */
const AutocompleteStatus = React.forwardRef<HTMLDivElement, AutocompleteStatusProps>(({ className, ...props }, ref) => {
    const { rootClass } = useContext(AutocompleteRootContext);
    return (
        <ComboboxPrimitive.Status
            ref={ref}
            className={clsx(rootClass ? `${rootClass}-status` : undefined, className) || undefined}
            data-slot="autocomplete-status"
            {...props}
        />
    );
});

AutocompleteStatus.displayName = 'AutocompleteStatus';
markAsComboboxSearchPart(AutocompleteStatus);

export default AutocompleteStatus;
