'use client';
import React, { useContext } from 'react';
import ComboboxPrimitive from '~/core/primitives/Combobox/ComboboxPrimitive';
import { ComboboxRootContext } from '../contexts/ComboboxRootContext';

type ComboboxItemElement = React.ElementRef<typeof ComboboxPrimitive.Item>;
type ComboboxItemProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Item> & {
    customRootClass?: string;
};

const ComboboxItem = React.forwardRef<ComboboxItemElement, ComboboxItemProps>(({ customRootClass, children, value, disabled, ...props }, forwardedRef) => {
    const { rootClass } = useContext(ComboboxRootContext);

    return (
        <ComboboxPrimitive.Item
            className={`${rootClass}-item`}
            value={value}
            disabled={disabled}
            data-disabled={disabled ? '' : undefined}
            role="option"
            aria-disabled={disabled ? 'true' : undefined}
            ref={forwardedRef}
            {...props}
        >
            <span className={`${rootClass}-text`}>{children}</span>
        </ComboboxPrimitive.Item>
    );
});

ComboboxItem.displayName = 'ComboboxItem';

export default ComboboxItem;
