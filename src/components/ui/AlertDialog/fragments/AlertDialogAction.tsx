'use client';
import React, { useContext } from 'react';
import { AlertDialogContext } from '../contexts/AlertDialogContext';
import ButtonPrimitive from '~/core/primitives/Button';
import clsx from 'clsx';

export type AlertDialogActionProps = {
    children: React.ReactNode;
}

const AlertDialogAction = ({ children, asChild } : AlertDialogActionProps) => {
    const { rootClass, handleOpenChange, getItemProps } = useContext(AlertDialogContext);
    return (
        <ButtonPrimitive
            asChild={asChild}
            onClick={() => handleOpenChange(false)}
            className={clsx(`${rootClass}-action`)}
            {...getItemProps()}
        >
            {children}
        </ButtonPrimitive>
    );
};

export default AlertDialogAction;
