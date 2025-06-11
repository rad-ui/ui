import React from 'react';

export type SelectPrimitiveGroupProps = {
    children: React.ReactNode,
    className?: string,

}

function SelectPrimitiveGroup({ children, className }: SelectPrimitiveGroupProps) {
    return (
        <div className={className}>
            {children}
        </div>
    );
}

export default SelectPrimitiveGroup;
