import React, { createContext } from 'react';
import Primitive from '../../Primitive';
import { SelectPrimitiveContext } from '../contexts/SelectPrimitiveContext';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import useControllableState from '~/core/hooks/useControllableState';
import Floater from '~/core/primitives/Floater';

export type SelectPrimitiveRootProps = {
    children: React.ReactNode,
    className?: string,
    value?: string,
    defaultValue?: string,
    onValueChange?: (value: string) => void
    onClickOutside?: () => void;
}

function SelectPrimitiveRoot({children,className,value,defaultValue ='',onValueChange, onClickOutside = () => {} , ...props}: SelectPrimitiveRootProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = useControllableState(
        value,
        defaultValue,
        onValueChange
    );
    
    const handleOverlayClick = () => {
        onClickOutside();
    };
    const handleSelect= (value:string) => {
        setSelectedValue(value);
        setIsOpen(false)
    }
    const { context: floaterContext, refs, floatingStyles } = Floater.useFloating({
        open: isOpen,
    });

    const dismiss = Floater.useDismiss(floaterContext, {
        enabled: true,
    escapeKey: true,
    outsidePress: true 
    });
    const role = Floater.useRole(floaterContext, { role: 'select' });

    const { getReferenceProps, getFloatingProps, getItemProps } = Floater.useInteractions([
        dismiss,
        role
    ]);
    const values = { isOpen, setIsOpen, selectedValue, setSelectedValue, handleSelect, floaterContext, refs, floatingStyles, getReferenceProps, getFloatingProps, getItemProps,handleOverlayClick };

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