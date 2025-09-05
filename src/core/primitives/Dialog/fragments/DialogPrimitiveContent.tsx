'use client';
import React, { useContext } from 'react';
import { DialogPrimitiveContext } from '../context/DialogPrimitiveContext';
import Floater from '~/core/primitives/Floater';

export type DialogPrimitiveContentProps = {
    children: React.ReactNode;
    className?: string;
}

const DialogPrimitiveContent = ({ children, ...props } : DialogPrimitiveContentProps) => {
    const { isOpen, getFloatingProps, floaterContext, refs } = useContext(DialogPrimitiveContext);

    return (
        <>
            {isOpen && (
                <Floater.FocusManager context={floaterContext} returnFocus={true}>
                    <div ref={refs.setFloating} {...getFloatingProps()} {...props}>
                        {children}
                    </div>
                </Floater.FocusManager>
            )}
        </>
    );
};

export default DialogPrimitiveContent;
