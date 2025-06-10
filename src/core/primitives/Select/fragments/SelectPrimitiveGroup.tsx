import React from 'react';

export type SelectPrimitiveGroupProps = {
    children: React.ReactNode
}

function SelectPrimitiveGroup({ children }: SelectPrimitiveGroupProps) {
    return (
        <div>
            {children}
        </div>
    );
}

export default SelectPrimitiveGroup;
