'use client';
import clsx from 'clsx';
import React, { useContext } from 'react';
import ComboboxPrimitive from '~/core/primitives/Combobox/ComboboxPrimitive';
import { markAsComboboxSearchPart } from '~/core/primitives/Combobox/contexts/ComboboxSearchPart';
import { ComboboxRootContext } from '../contexts/ComboboxRootContext';

export type ComboboxStatusProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Status>;

/** Announces how many options match as the user types ("3 results"). Pass a function to word it. */
const ComboboxStatus = React.forwardRef<HTMLDivElement, ComboboxStatusProps>(({ className, ...props }, ref) => {
    const { rootClass } = useContext(ComboboxRootContext);
    return (
        <ComboboxPrimitive.Status
            ref={ref}
            className={clsx(rootClass ? `${rootClass}-status` : undefined, className) || undefined}
            data-slot="combobox-status"
            {...props}
        />
    );
});

ComboboxStatus.displayName = 'ComboboxStatus';
markAsComboboxSearchPart(ComboboxStatus);

export default ComboboxStatus;
