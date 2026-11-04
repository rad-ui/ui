'use client';
import clsx from 'clsx';
import React, { useContext } from 'react';
import ComboboxPrimitive from '~/core/primitives/Combobox/ComboboxPrimitive';
import { SelectRootContext } from '../contexts/SelectRootContext';

export type SelectGroupLabelProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.GroupLabel>;

const SelectGroupLabel = React.forwardRef<HTMLDivElement, SelectGroupLabelProps>(({ className, ...props }, ref) => {
    const { rootClass } = useContext(SelectRootContext);
    return (
        <ComboboxPrimitive.GroupLabel
            ref={ref}
            className={clsx(rootClass ? `${rootClass}-label` : undefined, className) || undefined}
            data-slot="select-label"
            {...props}
        />
    );
});

SelectGroupLabel.displayName = 'SelectGroupLabel';

export default SelectGroupLabel;
