'use client';
import React, { useContext, useEffect } from 'react';
import { SelectPrimitiveContext } from '../contexts/SelectPrimitiveContext';
import Primitive from '../../Primitive';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import Floater from '~/core/primitives/Floater';

export type SelectPrimitiveContentProps = {
    children: React.ReactNode
}

function SelectPrimitiveContent({ children, ...props }: SelectPrimitiveContentProps) {
    const { isOpen, elementsRef, labelsRef, floatingContext, refs, getFloatingProps, floatingStyles } = useContext(SelectPrimitiveContext);

    return (
        <>
            {isOpen && (
                <Floater.FocusManager context={floatingContext}>
                    <Floater.FloatingList elementsRef={elementsRef} labelsRef={labelsRef} >
                        <div
                            ref={refs.setFloating}
                            style={floatingStyles}
                            {...getFloatingProps()}
                            {...props}
                        >

                            {children}

                        </div>
                    </Floater.FloatingList>
                </Floater.FocusManager>
            )}
        </>

    );
}

export default SelectPrimitiveContent;
