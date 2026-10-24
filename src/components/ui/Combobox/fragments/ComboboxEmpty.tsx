'use client';
import clsx from 'clsx';
import React, { useContext } from 'react';
import ComboboxPrimitive from '~/core/primitives/Combobox/ComboboxPrimitive';
import { markAsComboboxSearchPart } from '~/core/primitives/Combobox/contexts/ComboboxSearchPart';
import { ComboboxRootContext } from '../contexts/ComboboxRootContext';

export type ComboboxEmptyProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Empty>;

/** Shown inside the content when the typed text matches no option, such as "No results". */
const ComboboxEmpty = React.forwardRef<HTMLDivElement, ComboboxEmptyProps>(({ className, ...props }, ref) => {
    const { rootClass } = useContext(ComboboxRootContext);
    return (
        <ComboboxPrimitive.Empty
            ref={ref}
            className={clsx(rootClass ? `${rootClass}-empty` : undefined, className) || undefined}
            data-slot="combobox-empty"
            {...props}
        />
    );
});

ComboboxEmpty.displayName = 'ComboboxEmpty';
markAsComboboxSearchPart(ComboboxEmpty);

export default ComboboxEmpty;
