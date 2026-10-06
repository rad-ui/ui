'use client';
import clsx from 'clsx';
import React, { useContext } from 'react';
import ComboboxPrimitive from '~/core/primitives/Combobox/ComboboxPrimitive';
import { SelectRootContext } from '../contexts/SelectRootContext';
import { getNodeText, markAsComboboxItemPart } from '~/core/primitives/Combobox/utils/itemLabels';

type SelectItemElement = React.ElementRef<typeof ComboboxPrimitive.Item>;
export type SelectItemProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Item> & {
    customRootClass?: string;
};

const SelectItem = React.forwardRef<SelectItemElement, SelectItemProps>(({ customRootClass, children, className, value, label, disabled, ...props }, forwardedRef) => {
    const { rootClass } = useContext(SelectRootContext);
    const itemLabel = label || getNodeText(children).trim() || value;

    return (
        <ComboboxPrimitive.Item
            className={clsx(rootClass ? `${rootClass}-item` : undefined, className) || undefined}
            value={value}
            label={itemLabel}
            disabled={disabled}
            data-disabled={disabled ? '' : undefined}
            data-slot="select-item"
            role="option"
            aria-disabled={disabled ? 'true' : undefined}
            ref={forwardedRef}
            {...props}
        >
            <span className={rootClass ? `${rootClass}-text` : undefined} data-slot="select-item-text">{children}</span>
        </ComboboxPrimitive.Item>
    );
});

SelectItem.displayName = 'SelectItem';
markAsComboboxItemPart(SelectItem);

export default SelectItem;
