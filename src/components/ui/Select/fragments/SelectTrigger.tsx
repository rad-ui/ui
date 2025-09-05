'use client';
import React, { useContext } from 'react';
import SelectPrimitive from '~/core/primitives/Select/Select';
import clsx from 'clsx';

import { SelectRootContext } from '../contexts/SelectRootContext';

type SelectTriggerProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    customRootClass?: string;
    placeholder?: string;
};

const SelectTrigger = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Trigger>, SelectTriggerProps>(
    ({ customRootClass, children, disabled, placeholder, className, ...rest }, ref) => {
        const { rootClass } = useContext(SelectRootContext);
        const baseRoot = customRootClass ?? rootClass;
        const mergedClassName = clsx(baseRoot && `${baseRoot}-trigger`, className);

        return (
            <SelectPrimitive.Trigger
                className={mergedClassName}
                aria-disabled={disabled ? 'true' : undefined}
                data-placeholder={placeholder ? '' : undefined}
                disabled={disabled}
                ref={ref}
                {...rest}
            >
                {children}
            </SelectPrimitive.Trigger>
        );
    }
);

SelectTrigger.displayName = 'SelectTrigger';

export default SelectTrigger;
