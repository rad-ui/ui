import React, { useContext } from 'react';
import { AlertDialogContext } from '../contexts/AlertDialogContext';

export type AlertDialogContentProps = {
    children: React.ReactNode;
}

const AlertDialogContent = ({ children } : AlertDialogContentProps) => {
    const { isOpen } = useContext(AlertDialogContext);

    return (
        <>
            {isOpen && (
                <div className="alert-content fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-gray-900/50">
                    {children}
                </div>
            )}
        </>
    );
};

export default AlertDialogContent;
