'use client';
import clsx from 'clsx';
import React, { useContext } from 'react';
import ComboboxPrimitive from '~/core/primitives/Combobox/ComboboxPrimitive';
import { markAsComboboxSearchPart } from '~/core/primitives/Combobox/contexts/ComboboxSearchPart';
import { AutocompleteRootContext } from '../contexts/AutocompleteRootContext';

export type AutocompleteEmptyProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Empty>;

/** Shown inside the content when the typed text matches no option, such as "No results". */
const AutocompleteEmpty = React.forwardRef<HTMLDivElement, AutocompleteEmptyProps>(({ className, ...props }, ref) => {
    const { rootClass } = useContext(AutocompleteRootContext);
    return (
        <ComboboxPrimitive.Empty
            ref={ref}
            className={clsx(rootClass ? `${rootClass}-empty` : undefined, className) || undefined}
            data-slot="autocomplete-empty"
            {...props}
        />
    );
});

AutocompleteEmpty.displayName = 'AutocompleteEmpty';
markAsComboboxSearchPart(AutocompleteEmpty);

export default AutocompleteEmpty;
