import React from 'react';
import SelectPrimitive from '~/core/primitives/Select/Select';

export type SelectGroupProps = {
    children: React.ReactNode
};

function SelectGroup({ children }: SelectGroupProps) {
    return (
        <SelectPrimitive.Group>
            {children}
        </SelectPrimitive.Group>

    );
}

export default SelectGroup;
