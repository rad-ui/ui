import React, { createContext } from 'react';
import Primitive from '../../Primitive';
import { SelectContext } from '../contexts/SelectContext';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';

export type SelectRootProps = {
    children: React.ReactNode
}

function SelectRoot({children}: SelectRootProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState('');
    

    const handleSelect= (value:string) => {
        setSelectedValue(value);
        setIsOpen(false)
    }
    const values = { isOpen, setIsOpen, selectedValue, setSelectedValue, handleSelect };

    return (
        <SelectContext.Provider value={values}>
            <RovingFocusGroup.Root>
    
            {children}
        
        </RovingFocusGroup.Root>
        </SelectContext.Provider>
        
    );
}

export default SelectRoot;