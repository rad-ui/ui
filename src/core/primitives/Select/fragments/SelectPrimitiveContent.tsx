'use client';
import React, { useContext } from 'react';
import { SelectPrimitiveContext } from '../contexts/SelectPrimitiveContext';
import Floater from '~/core/primitives/Floater';

export type SelectPrimitiveContentProps = React.ComponentPropsWithoutRef<'div'> & {
    children: React.ReactNode;
    className?: string;
    position?: string;
};

const SelectPrimitiveContent = React.forwardRef<React.ElementRef<'div'>, SelectPrimitiveContentProps>(
    ({ children, className, ...props }, ref) => {
        const { isOpen, elementsRef, labelsRef, floatingContext, refs, getFloatingProps, floatingStyles } = useContext(SelectPrimitiveContext);

        return (
            <>
                {isOpen && (
                    <Floater.FocusManager context={floatingContext}>
                        <Floater.FloatingList elementsRef={elementsRef} labelsRef={labelsRef} >
                            <div
                                ref={Floater.useMergeRefs([refs.setFloating, ref])}
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
);

SelectPrimitiveContent.displayName = 'SelectPrimitiveContent';

export default SelectPrimitiveContent;
