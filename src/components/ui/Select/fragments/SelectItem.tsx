'use client';
import React, { useContext } from 'react';
import ComboboxPrimitive from '~/core/primitives/Combobox/ComboboxPrimitive';
import { SelectRootContext } from '../contexts/SelectRootContext';

type SelectItemElement = React.ElementRef<typeof ComboboxPrimitive.Item>;
export type SelectItemProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Item> & {
    customRootClass?: string;
};

function getNodeText(node: React.ReactNode): string {
    if (typeof node === 'string' || typeof node === 'number') {
        return String(node);
    }

    if (Array.isArray(node)) {
        return node.map(getNodeText).join('');
    }

    if (React.isValidElement(node)) {
        return getNodeText(node.props.children);
    }

    return '';
}

const SelectItem = React.forwardRef<SelectItemElement, SelectItemProps>(({ customRootClass, children, value, label, disabled, ...props }, forwardedRef) => {
    const { rootClass } = useContext(SelectRootContext);
    const itemLabel = label || getNodeText(children).trim() || value;

    return (
        <ComboboxPrimitive.Item
            className={rootClass ? `${rootClass}-item` : undefined}
            value={value}
            label={itemLabel}
            disabled={disabled}
            data-disabled={disabled ? '' : undefined}
            role="option"
            aria-disabled={disabled ? 'true' : undefined}
            ref={forwardedRef}
            {...props}
        >
            <span className={rootClass ? `${rootClass}-text` : undefined}>{children}</span>
        </ComboboxPrimitive.Item>
    );
});

SelectItem.displayName = 'SelectItem';

export default SelectItem;
