'use client';
import React, { useContext } from 'react';
import { SelectPrimitiveContext } from '../contexts/SelectPrimitiveContext';
import Floater from '~/core/primitives/Floater';

export type SelectPrimitiveContentProps = React.ComponentPropsWithoutRef<'div'> & {
    children: React.ReactNode;
    className?: string;
    position?: 'popper' | 'item-aligned';
};

const SelectPrimitiveContent = React.forwardRef<React.ElementRef<'div'>, SelectPrimitiveContentProps>(
    ({ children, className, position, ...props }, ref) => {
        const { isOpen, elementsRef, labelsRef, floatingContext, refs, getFloatingProps, floatingStyles } = useContext(SelectPrimitiveContext);
        const mergedRef = Floater.useMergeRefs([refs.setFloating, ref]);

        return (
            <>
                {isOpen && (
                    <Floater.FocusManager context={floatingContext}>
                        <Floater.FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
                            <div
                                ref={mergedRef}
                                style={floatingStyles}
                                className={className}
                                data-position={position}
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
