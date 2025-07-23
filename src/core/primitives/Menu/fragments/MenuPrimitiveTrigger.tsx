import React, {useState, useContext} from 'react'
import Floater from '~/core/primitives/Floater';
import MenuPrimitiveRootContext  from '../contexts/MenuPrimitiveRootContext';

const MenuPrimitiveTrigger = ({children, className}:any) => {
    const {isOpen, setIsOpen, refs, floatingStyles, getReferenceProps} = useContext(MenuPrimitiveRootContext)
    const {ref, index} = Floater.useListItem();
    
    return (
        <button className={className}
         onClick={() => setIsOpen(!isOpen)} 
        
         ref={Floater.useMergeRefs([refs.setReference, ref])}
         {...getReferenceProps()}
         >
        {children}
        </button>
    )
}
export default MenuPrimitiveTrigger