import React, { useContext } from 'react';
import SelectPrimitive from '~/core/primitives/Select/Select';
import { SelectRootContext } from '../contexts/SelectRootContext';

export type SelectGroupProps = {
    children: React.ReactNode
};

function SelectGroup({ children }: SelectGroupProps) {
    const { rootClass } = useContext(SelectRootContext);
    return (
        <SelectPrimitive.Group
            className={`${rootClass}-group`}
        >
            {children}
        </SelectPrimitive.Group>

    );
}

export default SelectGroup;
