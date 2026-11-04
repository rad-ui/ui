'use client';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { X } from 'lucide-react';
import ComboboxPrimitive from '~/core/primitives/Combobox/ComboboxPrimitive';
import { ComboboxRootContext } from '../contexts/ComboboxRootContext';

export type ComboboxClearProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Clear>;

/** Clears the selection; hidden while there's nothing to clear. */
const ComboboxClear = React.forwardRef<HTMLButtonElement, ComboboxClearProps>(({ className, children, ...props }, ref) => {
    const { rootClass } = useContext(ComboboxRootContext);
    return (
        <ComboboxPrimitive.Clear
            ref={ref}
            className={clsx(rootClass ? `${rootClass}-clear` : undefined, className) || undefined}
            data-slot="combobox-clear"
            {...props}
        >
            {children ?? <X width={14} height={14} aria-hidden="true" />}
        </ComboboxPrimitive.Clear>
    );
});

ComboboxClear.displayName = 'ComboboxClear';

export default ComboboxClear;
