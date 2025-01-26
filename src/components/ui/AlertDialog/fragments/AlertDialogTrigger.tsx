import React, { useContext } from 'react';
import { clsx } from 'clsx';
import ButtonPrimitive from '~/core/primitives/Button';
import { AlertDialogContext } from '../contexts/AlertDialogContext';

export type AlertDialogTriggerProps = {
    children: React.ReactNode;
}

const AlertDialogTrigger = ({ children, ...props } : AlertDialogTriggerProps) => {
    const { rootClass, handleOpenChange } = useContext(AlertDialogContext);

    return (
        <ButtonPrimitive 
           onClick={() => handleOpenChange(true)} {...props}
           className={clsx(`${rootClass}-trigger`)}
           >
            {children}
        </ButtonPrimitive>
    );
};

export default AlertDialogTrigger;
