'use client';
import React, { useContext } from 'react';
import SelectPrimitive from '~/core/primitives/Select/Select';

import { SelectRootContext } from '../contexts/SelectRootContext';

type SelectTriggerProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    customRootClass?: string;
    placeholder?: string;
};

const SelectTrigger = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Trigger>, SelectTriggerProps>(
    ({ customRootClass, children, disabled, placeholder, ...props }, ref) => {
        const { rootClass } = useContext(SelectRootContext);

        return (
            <SelectPrimitive.Trigger
                className={`${rootClass}-trigger`}
                aria-disabled={disabled ? 'true' : undefined}
                data-placeholder={placeholder ? '' : undefined}
                disabled={disabled}
                ref={ref}
                {...props}
            >

                {children}

            </SelectPrimitive.Trigger>
        );
    }
);

SelectTrigger.displayName = 'SelectTrigger';

export default SelectTrigger;
