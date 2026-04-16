'use client';
import React, { useContext } from 'react';
import ComboboxPrimitive from '~/core/primitives/Combobox/ComboboxPrimitive';

import { ComboboxRootContext } from '../contexts/ComboboxRootContext';

type ComboboxTriggerElement = React.ElementRef<typeof ComboboxPrimitive.Trigger>;
export type ComboboxTriggerProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Trigger> & {
    customRootClass?: string;
    placeholder?: boolean;
};

const ComboboxTrigger = React.forwardRef<ComboboxTriggerElement, ComboboxTriggerProps>(({ customRootClass, children, disabled, placeholder, ...props }, forwardedRef) => {
    const { rootClass } = useContext(ComboboxRootContext);

    return (
        <ComboboxPrimitive.Trigger
            className={rootClass ? `${rootClass}-trigger` : undefined}
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

ComboboxTrigger.displayName = 'ComboboxTrigger';

export default ComboboxTrigger;
