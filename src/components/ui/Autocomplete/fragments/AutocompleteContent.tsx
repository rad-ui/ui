'use client';
import clsx from 'clsx';
import React, { useContext } from 'react';
import ComboboxPrimitive from '~/core/primitives/Combobox/ComboboxPrimitive';
import { AutocompleteRootContext } from '../contexts/AutocompleteRootContext';

type AutocompleteContentElement = React.ElementRef<typeof ComboboxPrimitive.Content>;
export type AutocompleteContentProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Content> & {
    customRootClass?: string;
};

const AutocompleteContent = React.forwardRef<AutocompleteContentElement, AutocompleteContentProps>(({ customRootClass, children, className, position = 'popper', ...props }, forwardedRef) => {
    const { rootClass } = useContext(AutocompleteRootContext);

    return (
        <ComboboxPrimitive.Content
            className={clsx(rootClass ? `${rootClass}-content` : undefined, className) || undefined}
            position={position}
            data-position={position}
            data-slot="autocomplete-content"
            ref={forwardedRef}
            {...props}
        >
            {children}
        </ComboboxPrimitive.Content>
    );
});

AutocompleteContent.displayName = 'AutocompleteContent';

export default AutocompleteContent;
