import React, { useEffect, useRef, useContext } from 'react';
import SelectPrimitive from '~/core/primitives/Select/Select';
import { customClassSwitcher } from '~/core/customClassSwitcher';

const COMPONENT_NAME = 'Select';

function SelectContent({ customRootClass, children, position = "popper", ...props }: any) {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    return (
        <SelectPrimitive.Content 
            className={`${rootClass}-content`} 
            position={position}
            data-position={position}
            {...props}
        >
                {children}
            
        </SelectPrimitive.Content>
    );
}

export default SelectContent;