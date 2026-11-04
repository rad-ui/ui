'use client';
import clsx from 'clsx';
import React, { useContext } from 'react';
import ComboboxPrimitive from '~/core/primitives/Combobox/ComboboxPrimitive';
import { AutocompleteRootContext } from '../contexts/AutocompleteRootContext';
import { markAsComboboxItemPart } from '~/core/primitives/Combobox/utils/itemLabels';

type AutocompleteItemElement = React.ElementRef<typeof ComboboxPrimitive.Item>;
export type AutocompleteItemProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Item> & {
    customRootClass?: string;
};

const AutocompleteItem = React.forwardRef<AutocompleteItemElement, AutocompleteItemProps>(({ customRootClass, children, className, value, disabled, ...props }, forwardedRef) => {
    const { rootClass } = useContext(AutocompleteRootContext);

    return (
        <ComboboxPrimitive.Item
            className={clsx(rootClass ? `${rootClass}-item` : undefined, className) || undefined}
            value={value}
            disabled={disabled}
            data-disabled={disabled ? '' : undefined}
            role="option"
            data-slot="autocomplete-item"
            aria-disabled={disabled ? 'true' : undefined}
            ref={forwardedRef}
            {...props}
        >
            <span className={rootClass ? `${rootClass}-text` : undefined}>{children}</span>
        </ComboboxPrimitive.Item>
    );
});

AutocompleteItem.displayName = 'AutocompleteItem';
markAsComboboxItemPart(AutocompleteItem);

export default AutocompleteItem;
