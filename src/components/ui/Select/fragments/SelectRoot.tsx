import React, { useState, useCallback } from 'react';
import SelectPrimitive from '~/core/primitives/Select/Select';
import {customClassSwitcher} from '~/core/customClassSwitcher';

const COMPONENT_NAME = 'Select';

// Create a context to share the open/close functionality


function SelectRoot({ customRootClass, children, defaultOpen = false, ...props }: any) {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    
    // Function to close the dropdown
  
    
    return (
  
            <SelectPrimitive.Root 
                className={`${rootClass}-root`}
           
                {...props}
            >
                {children}
            </SelectPrimitive.Root>
 
    );
}

export default SelectRoot;