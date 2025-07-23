import React, {useState, useContext} from 'react'
import MenuPrimitiveRootContext  from '../contexts/MenuPrimitiveRootContext';

const MenuPrimitiveTrigger = ({children, className}:any) => {
    const {isOpen, setIsOpen, refs, floatingStyles, getReferenceProps} = useContext(MenuPrimitiveRootContext)
    return (
        <button className={className}
         onClick={() => setIsOpen(!isOpen)} 
         ref={refs.setReference}
         {...getReferenceProps()}
         >
        {children}
        </button>
    )
}
export default MenuPrimitiveTrigger