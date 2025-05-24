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
    

    const handleSelect= (value:string) => {
        setSelectedValue(value);
        setIsOpen(false)
    }

    const {refs, floatingStyles, context :floatingContext} = Floater.useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
  });

//   const click = Floater.useClick(context);
  const dismiss = Floater.useDismiss(floatingContext);
  const role = Floater.useRole(floatingContext);
 
  // Merge all the interactions into prop getters
  const {getReferenceProps, getFloatingProps} = Floater.useInteractions([
    // click,
    dismiss,
    role,
  ]);
    
    const values = { isOpen, setIsOpen, selectedValue, setSelectedValue, handleSelect,floatingContext, refs, getFloatingProps, getReferenceProps, floatingStyles };

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