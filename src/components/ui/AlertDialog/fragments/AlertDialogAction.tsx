import React, { useContext } from 'react';
import { AlertDialogContext } from '../contexts/AlertDialogContext';
import ButtonPrimitive from '~/core/primitives/Button';
import clsx from 'clsx';

export type AlertDialogActionProps = {
    children: React.ReactNode;
}

const AlertDialogAction = ({ children } : AlertDialogActionProps) => {
    const { rootClass, handleOpenChange } = useContext(AlertDialogContext);
    return (
        <ButtonPrimitive
            onClick={() => handleOpenChange(false)}
            className={clsx(`${rootClass}-action`)}
        >
            {children}
        </ButtonPrimitive>
    );
};

export default AlertDialogAction;
