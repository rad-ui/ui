'use client';
import React, { useContext } from 'react';
import { ComboboxPrimitiveContext } from '../contexts/ComboboxPrimitiveContext';
import Floater from '~/core/primitives/Floater';

export type ComboboxPrimitiveContentProps = {
    children: React.ReactNode;
    className?: string;
    position?: string;
    [key: string]: any;
}

const ComboboxPrimitiveContent = React.forwardRef<
    React.ElementRef<'div'>,
    ComboboxPrimitiveContentProps & React.ComponentPropsWithoutRef<'div'>
>(({ children, className, ...props }, forwardedRef) => {
    const { isOpen, elementsRef, labelsRef, floatingContext, refs, getFloatingProps, floatingStyles } = useContext(ComboboxPrimitiveContext);

    return (
        <>
            {isOpen && (
                <Floater.FocusManager context={floatingContext}>
                    <Floater.FloatingList elementsRef={elementsRef} labelsRef={labelsRef} >
                        <div
                            ref={Floater.useMergeRefs([refs.setFloating, forwardedRef])}
                            style={floatingStyles}
                            className={className}
                            data-state={isOpen ? 'open' : 'closed'}
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

ComboboxPrimitiveContent.displayName = 'ComboboxPrimitiveContent';

export default ComboboxPrimitiveContent;
