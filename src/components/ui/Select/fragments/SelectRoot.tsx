import React, { useState, useCallback } from 'react';
import SelectPrimitive from '~/core/primitives/Select/Select';
import {customClassSwitcher} from '~/core/customClassSwitcher';

const COMPONENT_NAME = 'Select';

// Create a context to share the open/close functionality
export const SelectRootContext = React.createContext<{
    closeDropdown: () => void;
} | undefined>(undefined);

function SelectRoot({ customRootClass, children, defaultOpen = false, ...props }: any) {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const [open, setOpen] = useState(defaultOpen);
    
    // Function to close the dropdown
    const closeDropdown = useCallback(() => {
        setOpen(false);
    }, []);
    
    return (
        <SelectRootContext.Provider value={{ closeDropdown }}>
            <SelectPrimitive.Root 
                className={`${rootClass}-root`}
                open={open}
                onOpenChange={setOpen}
                {...props}
            >
                {children}
            </SelectPrimitive.Root>
        </SelectRootContext.Provider>
    );
}

export default SelectRoot;