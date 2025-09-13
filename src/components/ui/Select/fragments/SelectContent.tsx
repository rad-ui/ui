'use client';
import React, { useContext } from 'react';
import SelectPrimitive from '~/core/primitives/Select/Select';
import { SelectRootContext } from '../contexts/SelectRootContext';

type SelectContentElement = React.ElementRef<typeof SelectPrimitive.Content>;
type SelectContentProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
    customRootClass?: string;
};

const SelectContent = React.forwardRef<SelectContentElement, SelectContentProps>(({ customRootClass, children, position = 'popper', ...props }, forwardedRef) => {
    const { rootClass } = useContext(SelectRootContext);

    return (
        <SelectPrimitive.Content
            className={`${rootClass}-content`}
            position={position}
            data-position={position}
            ref={forwardedRef}
            {...props}
        >
            {children}
        </SelectPrimitive.Content>
    );
});

SelectContent.displayName = 'SelectContent';

export default SelectContent;
