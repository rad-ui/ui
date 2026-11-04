'use client';
import clsx from 'clsx';
import React, { useContext } from 'react';
import ComboboxPrimitive from '~/core/primitives/Combobox/ComboboxPrimitive';
import { SelectRootContext } from '../contexts/SelectRootContext';

export type SelectSeparatorProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Separator>;

const SelectSeparator = React.forwardRef<HTMLDivElement, SelectSeparatorProps>(({ className, ...props }, ref) => {
    const { rootClass } = useContext(SelectRootContext);
    return (
        <ComboboxPrimitive.Separator
            ref={ref}
            className={clsx(rootClass ? `${rootClass}-separator` : undefined, className) || undefined}
            data-slot="select-separator"
            {...props}
        />
    );
});

SelectSeparator.displayName = 'SelectSeparator';

export default SelectSeparator;
