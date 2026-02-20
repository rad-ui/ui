'use client';
import React, { useContext } from 'react';
import ComboboxPrimitive from '~/core/primitives/Combobox/ComboboxPrimitive';

import { SelectRootContext } from '../contexts/SelectRootContext';

type SelectTriggerElement = React.ElementRef<typeof ComboboxPrimitive.Trigger>;
type SelectTriggerProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Trigger> & {
    customRootClass?: string;
    placeholder?: boolean;
};

const SelectTrigger = React.forwardRef<SelectTriggerElement, SelectTriggerProps>(({ customRootClass, children, disabled, placeholder, ...props }, forwardedRef) => {
    const { rootClass } = useContext(SelectRootContext);

    return (
        <ComboboxPrimitive.Trigger
            className={`${rootClass}-trigger`}
            aria-disabled={disabled ? 'true' : undefined}
            data-placeholder={placeholder ? '' : undefined}
            disabled={disabled}
            ref={forwardedRef}
            {...props}
        >

            {children}

        </ComboboxPrimitive.Trigger>
    );
});

SelectTrigger.displayName = 'SelectTrigger';

export default SelectTrigger;
