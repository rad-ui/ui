import React from 'react'
import { useContext } from 'react'
import Floater from '~/core/primitives/Floater';
import MenuPrimitiveRootContext from '../contexts/MenuPrimitiveRootContext';

const MenuPrimitiveContent = ({children, className}:any) => {
    const {isOpen, refs, floatingStyles, getFloatingProps, elementsRef, labelsRef, nodeId} = useContext(MenuPrimitiveRootContext)
    if(!isOpen) return null
    return (
        
        <div ref={refs.setFloating} 
        style={floatingStyles}
        {...getFloatingProps()}
        className={className}
        >
            <Floater.FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
                {children}
        </Floater.FloatingList>
        </div>
        
    )
}
export default MenuPrimitiveContent