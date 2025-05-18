'use client';
import React, { useContext } from 'react';
import { AlertDialogContext } from '../contexts/AlertDialogContext';
import { clsx } from 'clsx';
import Floater from '~/core/primitives/Floater';

export type AlertDialogContentProps = {
    children: React.ReactNode;
    className?: string;
}

const AlertDialogContent = ({ children, className = '' } : AlertDialogContentProps) => {
    const { isOpen, rootClass, getFloatingProps, floaterContext, refs } = useContext(AlertDialogContext);

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

export default AlertDialogContent;
