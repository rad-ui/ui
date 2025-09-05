'use client';
import React, { useContext } from 'react';
import SelectPrimitive from '~/core/primitives/Select/Select';
import clsx from 'clsx';
import { SelectRootContext } from '../contexts/SelectRootContext';

type SelectContentProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
    customRootClass?: string;
    position?: 'popper' | 'item-aligned';
};

const SelectContent = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Content>, SelectContentProps>(
    ({ customRootClass, children, position = 'popper', className, ...props }, ref) => {
        const { rootClass } = useContext(SelectRootContext);
        const baseRoot = customRootClass ?? rootClass;
        const mergedClassName = clsx(baseRoot && `${baseRoot}-content`, className);

        return (
            <SelectPrimitive.Content
                className={mergedClassName}
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
