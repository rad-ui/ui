import React, { useContext } from 'react';
import { AlertDialogContext } from '../contexts/AlertDialogContext';

export type AlertDialogContentProps = {
    children: React.ReactNode;
}

const AlertDialogContent = ({ children } : AlertDialogContentProps) => {
    const { isOpen, rootClass } = useContext(AlertDialogContext);

    return (
        <>
            {isOpen && (
                <div className={`${rootClass}-content`}>
                    {children}
                </div>
            )}
        </>
    );
};

export default AlertDialogContent;
