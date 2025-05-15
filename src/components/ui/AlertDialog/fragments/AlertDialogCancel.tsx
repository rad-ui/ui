import React, { useContext } from 'react';
import { AlertDialogContext } from '../contexts/AlertDialogContext';
import ButtonPrimitive from '~/core/primitives/Button';
import { clsx } from 'clsx';

export type AlertDialogCancelProps = {
    children: React.ReactNode;
}

const AlertDialogCancel = ({ children, asChild } : AlertDialogCancelProps) => {
    const { rootClass, handleOpenChange, getItemProps } = useContext(AlertDialogContext);
    return (
        <ButtonPrimitive
            asChild={asChild}
            onClick={() => handleOpenChange(false)}
            className={clsx(`${rootClass}-cancel`)}
            {...getItemProps()}
        >
            {children}
        </ButtonPrimitive>
    );
};

export default AlertDialogCancel;
