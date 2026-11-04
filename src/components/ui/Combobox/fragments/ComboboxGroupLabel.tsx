'use client';
import clsx from 'clsx';
import React, { useContext } from 'react';
import ComboboxPrimitive from '~/core/primitives/Combobox/ComboboxPrimitive';
import { ComboboxRootContext } from '../contexts/ComboboxRootContext';

export type ComboboxGroupLabelProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.GroupLabel>;

const ComboboxGroupLabel = React.forwardRef<HTMLDivElement, ComboboxGroupLabelProps>(({ className, ...props }, ref) => {
    const { rootClass } = useContext(ComboboxRootContext);
    return (
        <ComboboxPrimitive.GroupLabel
            ref={ref}
            className={clsx(rootClass ? `${rootClass}-label` : undefined, className) || undefined}
            data-slot="combobox-label"
            {...props}
        />
    );
});

ComboboxGroupLabel.displayName = 'ComboboxGroupLabel';

export default ComboboxGroupLabel;
