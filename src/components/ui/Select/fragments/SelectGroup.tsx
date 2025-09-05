import React, { useContext } from 'react';
import SelectPrimitive from '~/core/primitives/Select/Select';
import { SelectRootContext } from '../contexts/SelectRootContext';

export type SelectGroupProps = {
    children: React.ReactNode
};

type SelectGroupElement = React.ElementRef<typeof SelectPrimitive.Group>;
type SelectGroupComponentProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Group> & SelectGroupProps;

const SelectGroup = React.forwardRef<SelectGroupElement, SelectGroupComponentProps>(({ children, ...props }, forwardedRef) => {
    const { rootClass } = useContext(SelectRootContext);
    return (
        <SelectPrimitive.Group
            className={`${rootClass}-group`}
            ref={forwardedRef}
            {...props}
        >
            {children}
        </SelectPrimitive.Group>

    );
});

SelectGroup.displayName = 'SelectGroup';

export default SelectGroup;
