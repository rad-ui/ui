'use client';
import React, { useContext, useEffect } from 'react';
import { SelectPrimitiveContext } from '../contexts/SelectPrimitiveContext';
import Floater from '~/core/primitives/Floater';

export type SelectPrimitiveContentProps = {
    children: React.ReactNode;
    className?: string;
    position?: string;
    [key: string]: any;
}

function SelectPrimitiveContent({ children, className, ...props }: SelectPrimitiveContentProps) {
    const { isOpen, elementsRef, labelsRef, floatingContext, refs, getFloatingProps, floatingStyles } = useContext(SelectPrimitiveContext);
    return (
        <>
            {isOpen && (
                <Floater.FocusManager context={floatingContext}>
                    <Floater.FloatingList elementsRef={elementsRef} labelsRef={labelsRef} >
                        <div
                            ref={refs.setFloating}
                            style={floatingStyles}
                            className={className}
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
