'use client';
import React, { useContext } from 'react';
import { SelectPrimitiveContext } from '../contexts/SelectPrimitiveContext';
import Floater from '~/core/primitives/Floater';

export type SelectPrimitiveContentProps = {
    children: React.ReactNode;
    className?: string;
    position?: string;
    [key: string]: any;
}

const SelectPrimitiveContent = React.forwardRef<
    React.ElementRef<'div'>,
    SelectPrimitiveContentProps & React.ComponentPropsWithoutRef<'div'>
>(({ children, className, ...props }, forwardedRef) => {
    const { isOpen, elementsRef, labelsRef, floatingContext, refs, getFloatingProps, floatingStyles } = useContext(SelectPrimitiveContext);

    return (
        <>
            {isOpen && (
                <Floater.FocusManager context={floatingContext}>
                    <Floater.FloatingList elementsRef={elementsRef} labelsRef={labelsRef} >
                        <div
                            ref={Floater.useMergeRefs([refs.setFloating, forwardedRef])}
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
});

SelectPrimitiveContent.displayName = 'SelectPrimitiveContent';

export default SelectPrimitiveContent;
