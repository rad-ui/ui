import React, { useContext } from 'react';
import { AlertDialogContext } from '../contexts/AlertDialogContext';
import ButtonPrimitive from '~/core/primitives/Button';

export type AlertDialogCancelProps = {
    children: React.ReactNode;
}

const AlertDialogCancel = ({ children } : AlertDialogCancelProps) => {
    const { setOpen } = useContext(AlertDialogContext);
    return (
        <ButtonPrimitive onClick={() => setOpen(false)}>
            {children}
        </ButtonPrimitive>
    );
};

export default AlertDialogCancel;
