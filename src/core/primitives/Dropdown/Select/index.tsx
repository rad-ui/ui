import Primitive from '~/core/primitives/Primitive';
import React, { useState } from 'react';

type SelectPrimitiveProps = {  
  children?: React.ReactNode, 
  options: string[],
  value?: string | null,
  onChange?: (value: string) => void;
}

const SelectPrimitive = ({ children, options, value, onChange, ...props }:SelectPrimitiveProps) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(value ?? null)
    
    const handleClick = () => {
        setIsOpen(!isOpen)
    }
    
    const handleSelect = (option: string) => {
        setSelected(option)
        onChange?.(option)
        setIsOpen(false)
    }
    return (
        <>
          <Primitive.button onClick={handleClick} {...props}>
            {children}
         </Primitive.button>
        {isOpen && options.map((option, index) => (
            <div key={index} onClick={() => handleSelect(option)}>{option}</div>
  ))}
       </>
    );
   
};

export default SelectPrimitive