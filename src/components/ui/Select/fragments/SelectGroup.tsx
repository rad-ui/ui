import React, { useContext } from 'react';
import SelectPrimitive from '~/core/primitives/Select/Select';
import { SelectRootContext } from '../contexts/SelectRootContext';

export type SelectGroupProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Group> & {
    children: React.ReactNode
};

const SelectGroup = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Group>, SelectGroupProps>(
    ({ children, ...props }, ref) => {
        const { rootClass } = useContext(SelectRootContext);
        return (
            <SelectPrimitive.Group
                className={`${rootClass}-group`}
                ref={ref}
                {...props}
            >
                {children}
            </SelectPrimitive.Group>

        );
    }
);

SelectGroup.displayName = 'SelectGroup';

export default SelectGroup;
