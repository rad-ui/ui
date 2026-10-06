'use client';
import clsx from 'clsx';
import React, { useContext } from 'react';
import ComboboxPrimitive from '~/core/primitives/Combobox/ComboboxPrimitive';
import { SelectRootContext } from '../contexts/SelectRootContext';

type SelectContentElement = React.ElementRef<typeof ComboboxPrimitive.Content>;
export type SelectContentProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Content> & {
    customRootClass?: string;
};

const SelectContent = React.forwardRef<SelectContentElement, SelectContentProps>(({ customRootClass, children, className, position = 'popper', ...props }, forwardedRef) => {
    const { rootClass } = useContext(SelectRootContext);

    return (
        <ComboboxPrimitive.Content
            className={clsx(rootClass ? `${rootClass}-content` : undefined, className) || undefined}
            position={position}
            data-position={position}
            data-slot="select-content"
            ref={forwardedRef}
            {...props}
        >
            {children}
        </ComboboxPrimitive.Content>
    );
});

SelectContent.displayName = 'SelectContent';

export default SelectContent;
