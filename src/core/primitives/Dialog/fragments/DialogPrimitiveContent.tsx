'use client';
import React, { useContext } from 'react';
import { DialogPrimitiveContext } from '../context/DialogPrimitiveContext';
import { clsx } from 'clsx';
import Floater from '~/core/primitives/Floater';

export type DialogPrimitiveContentProps = {
    children: React.ReactNode;
    className?: string;
}

const DialogPrimitiveContent = ({ children, className = '' } : DialogPrimitiveContentProps) => {
    const { isOpen, rootClass, getFloatingProps, floaterContext, refs } = useContext(DialogPrimitiveContext);

    return (
        <>
            {isOpen && (
                <Floater.FocusManager context={floaterContext} returnFocus={true}>
                    <div ref={refs.setFloating} className={clsx(`${rootClass}-content`, className)} {...getFloatingProps()}>
                        {children}
                    </div>
                </Floater.FocusManager>
            )}
        </>
    );
};

export default DialogPrimitiveContent;
