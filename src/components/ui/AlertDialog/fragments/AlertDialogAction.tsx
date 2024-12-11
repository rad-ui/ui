import React, { useContext } from 'react';
import { AlertDialogContext } from '../contexts/AlertDialogContext';
import ButtonPrimitive from '~/core/primitives/Button';

export type AlertDialogActionProps = {
    children: React.ReactNode;
}

const AlertDialogAction = ({ children } : AlertDialogActionProps) => {
    const { handleOpenChange } = useContext(AlertDialogContext);
    return (
        <ButtonPrimitive onClick={() => handleOpenChange(false)}>
            {children}
        </ButtonPrimitive>
    );
};

export default AlertDialogAction;
