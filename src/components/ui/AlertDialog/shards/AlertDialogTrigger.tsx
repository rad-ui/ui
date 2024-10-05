import React, { useContext } from 'react';

import ButtonPrimitive from '~/core/primitives/Button';
import { AlertDialogContext } from '../contexts/AlertDialogContext';

export type AlertDialogTriggerProps = {
    children: React.ReactNode;
}

const AlertDialogTrigger = ({ children, ...props } : AlertDialogTriggerProps) => {
    const { floaterContext } = useContext(AlertDialogContext);
    const { open, setOpen } = useContext(AlertDialogContext);

    return (
        <ButtonPrimitive onClick={() => setOpen(true)} {...props}>
            {children}
        </ButtonPrimitive>
    );
};

export default AlertDialogTrigger;
