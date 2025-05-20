import React, { createContext } from 'react';
import Primitive from '../../Primitive';
import { SelectPrimitiveContext } from '../contexts/SelectPrimitiveContext';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import useControllableState from '~/core/hooks/useControllableState';

export type SelectPrimitiveRootProps = {
    children: React.ReactNode,
    className?: string,
    value?: string,
    defaultValue?: string,
    onValueChange?: (value: string) => void
}

function SelectPrimitiveRoot({children,className,value,defaultValue ='',onValueChange, ...props}: SelectPrimitiveRootProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = useControllableState(
        value,
        defaultValue,
        onValueChange
    );
    

    const handleSelect= (value:string) => {
        setSelectedValue(value);
        setIsOpen(false)
    }
    const values = { isOpen, setIsOpen, selectedValue, setSelectedValue, handleSelect };

    return (
        <SelectPrimitiveContext.Provider value={values} >
            <RovingFocusGroup.Root>
        <Primitive.div {...props} className={className}
        
        >
  {children}
        </Primitive.div>
          
        
        </RovingFocusGroup.Root>
        </SelectPrimitiveContext.Provider>
        
    );
}

export default SelectPrimitiveRoot;