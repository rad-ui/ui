import React, { useContext, useEffect } from 'react';
import { SelectPrimitiveContext } from '../contexts/SelectPrimitiveContext';
import Primitive from '../../Primitive';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import Floater from '~/core/primitives/Floater';


export type SelectPrimitiveContentProps = {
    children: React.ReactNode
}

function SelectPrimitiveContent({children, ...props}: SelectPrimitiveContentProps) {
    const {isOpen, setIsOpen, selectedValue, getFloatingProps, floaterContext, refs} = useContext(SelectPrimitiveContext);
    // if (!isOpen) return null;
    // const contentRef = React.useRef<HTMLDivElement>(null);
    // useEffect(() => {
        
    //     // console.log(contentRef.current?.children);
    //     //check array for value equal to the selected value and set focus
    //     if (!contentRef.current) return;
    //     contentRef.current?.children[0].focus();
    //     for (let i = 0; i < contentRef.current?.children.length; i++) {
    //         if (contentRef.current?.children[i].getAttribute('data-value') === selectedValue) {
    //             contentRef.current?.children[i].focus();
    //         }
    //     }

    //     document.addEventListener('keydown', (e) => {
    //         if (e.key === 'Escape') {
    //             setIsOpen(false);
    //         }
    //     })

    //     document.addEventListener('mousedown', (e) => {
    //         if (contentRef.current && !contentRef.current.contains(e.target)) {
    //         setIsOpen(false);

    //       }
    //     })
    // },[])
    return (
        <>
        {isOpen &&(
            <Floater.FocusManager context={floaterContext} returnFocus={true}>
            <RovingFocusGroup.Group>
        <Primitive.div {...props} {...getFloatingProps()} ref={refs.setFloating}>
            
                {children}
            
        </Primitive.div>
        </RovingFocusGroup.Group>
        </Floater.FocusManager>

        )}
        </>
        
    );
}

export default SelectPrimitiveContent;