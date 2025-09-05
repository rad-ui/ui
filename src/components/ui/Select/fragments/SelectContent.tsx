'use client';
import React, { useContext } from 'react';
import SelectPrimitive from '~/core/primitives/Select/Select';
import { SelectRootContext } from '../contexts/SelectRootContext';

type SelectContentProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
    customRootClass?: string;
    position?: string;
};

const SelectContent = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Content>, SelectContentProps>(
    ({ customRootClass, children, position = 'popper', ...props }, ref) => {
        const { rootClass } = useContext(SelectRootContext);

        return (
            <SelectPrimitive.Content
                className={`${rootClass}-content`}
                position={position}
                data-position={position}
                ref={ref}
                {...props}
            >
                {children}
            </SelectPrimitive.Content>
        );
    }
);

SelectContent.displayName = 'SelectContent';

export default SelectContent;
