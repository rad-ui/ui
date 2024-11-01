import React, { useContext } from 'react';

import ButtonPrimitive from '~/core/primitives/Button';
import { AlertDialogContext } from '../contexts/AlertDialogContext';

export type AlertDialogTriggerProps = {
    children: React.ReactNode;
}

const AlertDialogTrigger = ({ children, ...props } : AlertDialogTriggerProps) => {
    const { isOpen, handleOpenChange, floaterContext } = useContext(AlertDialogContext);

    return (
        <ButtonPrimitive onClick={() => handleOpenChange(true)} {...props}>
            {children}
        </ButtonPrimitive>
    );
};

export default AlertDialogTrigger;
