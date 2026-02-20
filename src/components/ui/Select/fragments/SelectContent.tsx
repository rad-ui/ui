'use client';
import React, { useContext } from 'react';
import ComboboxPrimitive from '~/core/primitives/Combobox/ComboboxPrimitive';
import { SelectRootContext } from '../contexts/SelectRootContext';

type SelectContentElement = React.ElementRef<typeof ComboboxPrimitive.Content>;
type SelectContentProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Content> & {
    customRootClass?: string;
};

const SelectContent = React.forwardRef<SelectContentElement, SelectContentProps>(({ customRootClass, children, position = 'popper', ...props }, forwardedRef) => {
    const { rootClass } = useContext(SelectRootContext);

    return (
        <ComboboxPrimitive.Content
            className={`${rootClass}-content`}
            position={position}
            data-position={position}
            ref={forwardedRef}
            {...props}
        >
            {children}
        </ComboboxPrimitive.Content>
    );
});

SelectContent.displayName = 'SelectContent';

export default SelectContent;
