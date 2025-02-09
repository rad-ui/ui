import React from 'react';

export interface RovingFocusItemProps {
    children: any
}

function RovingFocusItem({children} : RovingFocusItemProps) {
    return (
        <div>
            {children}  
        </div>
    );
}

export default RovingFocusItem;