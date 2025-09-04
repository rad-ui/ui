'use client';
import React, { forwardRef, useContext } from 'react';
import { DialogPrimitiveContext } from '../context/DialogPrimitiveContext';
import Floater from '~/core/primitives/Floater';

export type DialogPrimitiveContentProps = {
    children: React.ReactNode;
    className?: string;
}

const DialogPrimitiveContent = forwardRef<HTMLDivElement, DialogPrimitiveContentProps>(({ children, ...props }, ref) => {
    const { isOpen, getFloatingProps, floaterContext, refs } = useContext(DialogPrimitiveContext);

    const mergedRef = Floater.useMergeRefs([refs.setFloating, ref]);

    return (
        <>
            {isOpen && (
                <Floater.FocusManager context={floaterContext} returnFocus={true}>
                    <div ref={mergedRef} {...getFloatingProps()} {...props}>
                        {children}
                    </div>
                </Floater.FocusManager>
            )}
        </>
    );
});

export default DialogPrimitiveContent;
