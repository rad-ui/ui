'use client';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { X } from 'lucide-react';
import ComboboxPrimitive from '~/core/primitives/Combobox/ComboboxPrimitive';
import { AutocompleteRootContext } from '../contexts/AutocompleteRootContext';

export type AutocompleteClearProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Clear>;

/** Clears the text; hidden while there's nothing to clear. */
const AutocompleteClear = React.forwardRef<HTMLButtonElement, AutocompleteClearProps>(({ className, children, ...props }, ref) => {
    const { rootClass } = useContext(AutocompleteRootContext);
    return (
        <ComboboxPrimitive.Clear
            ref={ref}
            className={clsx(rootClass ? `${rootClass}-clear` : undefined, className) || undefined}
            data-slot="autocomplete-clear"
            {...props}
        >
            {children ?? <X width={14} height={14} aria-hidden="true" />}
        </ComboboxPrimitive.Clear>
    );
});

AutocompleteClear.displayName = 'AutocompleteClear';

export default AutocompleteClear;
