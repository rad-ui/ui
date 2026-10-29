'use client';
import clsx from 'clsx';
import React, { useContext } from 'react';
import ComboboxPrimitive from '~/core/primitives/Combobox/ComboboxPrimitive';

import { SelectRootContext } from '../contexts/SelectRootContext';

type SelectTriggerElement = React.ElementRef<typeof ComboboxPrimitive.Trigger>;
export type SelectTriggerProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Trigger> & {
    customRootClass?: string;
    placeholder?: boolean;
    renderValue?: (value: string, label: string) => React.ReactNode;
};

const SelectTrigger = React.forwardRef<SelectTriggerElement, SelectTriggerProps>(({ customRootClass, children, className, disabled, placeholder, ...props }, forwardedRef) => {
    const { rootClass } = useContext(SelectRootContext);

    return (
        <ComboboxPrimitive.Trigger
            className={clsx(rootClass ? `${rootClass}-trigger` : undefined, className) || undefined}
            aria-disabled={disabled ? 'true' : undefined}
            data-placeholder={placeholder ? '' : undefined}
            data-slot="select-trigger"
            disabled={disabled}
            ref={forwardedRef}
            {...props}
        >

            {children}

        </ComboboxPrimitive.Trigger>
    );
}) as React.ForwardRefExoticComponent<SelectTriggerProps & React.RefAttributes<SelectTriggerElement>>;

SelectTrigger.displayName = 'SelectTrigger';

export default SelectTrigger;
