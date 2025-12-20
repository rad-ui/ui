'use client';
import React, { useContext } from 'react';
import SelectPrimitive from '~/core/primitives/Select/ComboboxPrimitive';

import { SelectRootContext } from '../contexts/SelectRootContext';

type SelectTriggerElement = React.ElementRef<typeof SelectPrimitive.Trigger>;
type SelectTriggerProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    customRootClass?: string;
    placeholder?: boolean;
};

const SelectTrigger = React.forwardRef<SelectTriggerElement, SelectTriggerProps>(({ customRootClass, children, disabled, placeholder, ...props }, forwardedRef) => {
    const { rootClass } = useContext(SelectRootContext);

    return (
        <SelectPrimitive.Trigger
            className={`${rootClass}-trigger`}
            aria-disabled={disabled ? 'true' : undefined}
            data-placeholder={placeholder ? '' : undefined}
            disabled={disabled}
            ref={forwardedRef}
            {...props}
        >

            {children}

        </SelectPrimitive.Trigger>
    );
});

SelectTrigger.displayName = 'SelectTrigger';

export default SelectTrigger;
