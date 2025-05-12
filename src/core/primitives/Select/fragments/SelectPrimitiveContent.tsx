import React, { useContext } from 'react';
import Floater from '../../Floater';
import { SelectPrimitiveContext } from '../contexts/SelectPrimitiveContext';
import Primitive from '../../Primitive';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';

export type SelectPrimitiveContentProps = {
    children: React.ReactNode
}

function SelectPrimitiveContent({children, ...props}: SelectPrimitiveContentProps) {
    const {isOpen, setIsOpen} = useContext(SelectPrimitiveContext);
    if (!isOpen) return null;
    return (
        <RovingFocusGroup.Group>
        <Primitive.div {...props}>
            
                {children}
            
        </Primitive.div>
        </RovingFocusGroup.Group>
        
    );
}

export default SelectPrimitiveContent;