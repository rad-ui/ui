import React, { useContext } from 'react';
import { AlertDialogContext } from '../contexts/AlertDialogContext';
import ButtonPrimitive from '~/core/primitives/Button';

export type AlertDialogCancelProps = {
    children: React.ReactNode;
}

const AlertDialogCancel = ({ children } : AlertDialogCancelProps) => {
    const { handleOpenChange } = useContext(AlertDialogContext);
    return (
        <ButtonPrimitive onClick={() => handleOpenChange(false)}>
            {children}
        </ButtonPrimitive>
    );
};

export default AlertDialogCancel;
