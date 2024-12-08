import React, { useContext } from 'react';
import { AlertDialogContext } from '../contexts/AlertDialogContext';
import { clsx } from 'clsx';
export type AlertDialogContentProps = {
    children: React.ReactNode;
}

const AlertDialogContent = ({ children } : AlertDialogContentProps) => {
    const { isOpen, rootClass } = useContext(AlertDialogContext);

    return (
        <>
            {isOpen && (
                <div className={clsx(`${rootClass}-content`)}>
                    {children}
                </div>
            )}
        </>
    );
};

export default AlertDialogContent;
