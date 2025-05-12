import React, { useContext } from 'react';
import Floater from '../../Floater';
import { SelectContext } from '../contexts/SelectContext';
import Primitive from '../../Primitive';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';

export type SelectContentProps = {
    children: React.ReactNode
}

function SelectContent({children, ...props}: SelectContentProps) {
    const {isOpen, setIsOpen} = useContext(SelectContext);
    if (!isOpen) return null;
    return (
        <RovingFocusGroup.Group>
        <Primitive.div {...props}>
            
                {children}
            
        </Primitive.div>
        </RovingFocusGroup.Group>
        
    );
}

export default SelectContent;