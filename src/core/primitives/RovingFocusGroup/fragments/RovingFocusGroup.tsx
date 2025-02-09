import React, { Children } from 'react';



export interface RovingFocusRootProps {
    children: any
}

function RovingFocusRoot({children} : RovingFocusRootProps) {

    return (
        <div>
            {children}
        </div>
    );
}

export default RovingFocusRoot;