'use client';
import clsx from 'clsx';
import React, { useContext } from 'react';
import ComboboxPrimitive from '~/core/primitives/Combobox/ComboboxPrimitive';
import { ComboboxRootContext } from '../contexts/ComboboxRootContext';

export type ComboboxSeparatorProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Separator>;

const ComboboxSeparator = React.forwardRef<HTMLDivElement, ComboboxSeparatorProps>(({ className, ...props }, ref) => {
    const { rootClass } = useContext(ComboboxRootContext);
    return (
        <ComboboxPrimitive.Separator
            ref={ref}
            className={clsx(rootClass ? `${rootClass}-separator` : undefined, className) || undefined}
            data-slot="combobox-separator"
            {...props}
        />
    );
});

ComboboxSeparator.displayName = 'ComboboxSeparator';

export default ComboboxSeparator;
