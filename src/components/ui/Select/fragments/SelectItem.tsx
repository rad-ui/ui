'use client';
import React, { useContext } from 'react';
import SelectPrimitive from '~/core/primitives/Select/Select';
import { SelectRootContext } from '../contexts/SelectRootContext';

type SelectItemProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
    customRootClass?: string;
};

const SelectItem = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Item>, SelectItemProps>(
    ({ customRootClass, children, value, disabled, ...props }, ref) => {
        const { rootClass } = useContext(SelectRootContext);

        return (
            <SelectPrimitive.Item
                className={`${rootClass}-item`}
                value={value}
                disabled={disabled}
                data-disabled={disabled ? '' : undefined}
                role="option"
                aria-disabled={disabled ? 'true' : undefined}
                ref={ref}
                {...props}
            >
                <span className={`${rootClass}-text`}>{children}</span>
            </SelectPrimitive.Item>
        );
    }
);

SelectItem.displayName = 'SelectItem';

export default SelectItem;
