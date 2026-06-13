'use client';
import React, { useContext } from 'react';
import ComboboxPrimitive from '~/core/primitives/Combobox/ComboboxPrimitive';
import clsx from 'clsx';

import { ComboboxRootContext } from '../contexts/ComboboxRootContext';

type ComboboxTriggerElement = React.ElementRef<typeof ComboboxPrimitive.Trigger>;
export type ComboboxTriggerProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Trigger> & {
    customRootClass?: string;
    placeholder?: boolean;
};

const ComboboxTrigger = React.forwardRef<ComboboxTriggerElement, ComboboxTriggerProps>(({ customRootClass, children, disabled, placeholder, className, ...props }, forwardedRef) => {
    const { rootClass } = useContext(ComboboxRootContext);
    const mergedClassName = clsx(rootClass ? `${rootClass}-trigger` : undefined, className) || undefined;

    return (
        <ComboboxPrimitive.Trigger
            className={mergedClassName}
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
