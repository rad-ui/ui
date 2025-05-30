import React, { useContext, useEffect } from 'react';
import { SelectPrimitiveContext } from '../contexts/SelectPrimitiveContext';
import Primitive from '../../Primitive';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import Floater from '~/core/primitives/Floater';

export type SelectPrimitiveContentProps = {
    children: React.ReactNode
}

function SelectPrimitiveContent({ children, ...props }: SelectPrimitiveContentProps) {
    const { isOpen, setIsOpen, selectedValue, floatingContext, refs, getFloatingProps, floatingStyles } = useContext(SelectPrimitiveContext);
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
    // },[])
    return (
        <>
            {isOpen && (
                <Floater.FocusManager context={floatingContext}>
                    <RovingFocusGroup.Group>
                        <div
                            ref={refs.setFloating}
                            style={{ ...floatingStyles }}
                            {...getFloatingProps()}
                            {...props} >

                            {children}

                        </div>
                    </RovingFocusGroup.Group>
                </Floater.FocusManager>
            )}
        </>

    );
}

export default SelectPrimitiveContent;
