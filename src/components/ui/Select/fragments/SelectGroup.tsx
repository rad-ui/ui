import React, { useContext } from 'react';
import SelectPrimitive from '~/core/primitives/Select/Select';
import clsx from 'clsx';
import { SelectRootContext } from '../contexts/SelectRootContext';

export type SelectGroupProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Group> & {
    children: React.ReactNode
};

const SelectGroup = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Group>, SelectGroupProps>(
    ({ children, className, ...rest }, ref) => {
        const { rootClass } = useContext(SelectRootContext);
        const mergedClassName = clsx(rootClass && `${rootClass}-group`, className);
        return (
            <SelectPrimitive.Group
                className={mergedClassName}
                ref={ref}
                {...rest}
            >
                {children}
            </SelectPrimitive.Group>

        );
    }
);

SelectGroup.displayName = 'SelectGroup';

export default SelectGroup;
