import React from 'react';
import { customClassSwitcher } from '~/core/customClassSwitcher';

const COMPONENT_NAME = 'Select';

function SelectSeparator({ customRootClass, ...props }: any) {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    return (
        <div 
            className={`${rootClass}-separator`} 
            role="separator"
            aria-orientation="horizontal"
            {...props} 
        />
    );
}

export default SelectSeparator; 