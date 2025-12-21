import React, { useContext } from 'react';
import ComboboxPrimitive from '~/core/primitives/Combobox/ComboboxPrimitive';
import { SelectRootContext } from '../contexts/SelectRootContext';

export type SelectGroupProps = {
    children: React.ReactNode
};

type SelectGroupElement = React.ElementRef<typeof ComboboxPrimitive.Group>;
type SelectGroupComponentProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Group> & SelectGroupProps;

const SelectGroup = React.forwardRef<SelectGroupElement, SelectGroupComponentProps>(({ children, ...props }, forwardedRef) => {
    const { rootClass } = useContext(SelectRootContext);
    return (
        <ComboboxPrimitive.Group
            className={`${rootClass}-group`}
            ref={forwardedRef}
            {...props}
        >
            {children}
        </ComboboxPrimitive.Group>

    );
});

SelectGroup.displayName = 'SelectGroup';

export default SelectGroup;
