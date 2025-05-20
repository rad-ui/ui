'use client';
import React, { useContext } from 'react';
import { AlertDialogContext } from '../contexts/AlertDialogContext';
import ButtonPrimitive from '~/core/primitives/Button';
import clsx from 'clsx';

export type AlertDialogActionProps = {
    children: React.ReactNode;
    asChild?: boolean;
    className?: string;
}

const AlertDialogAction = ({ children, asChild, className = '', ...props } : AlertDialogActionProps) => {
    const { rootClass, handleOpenChange, getItemProps } = useContext(AlertDialogContext);
    return (
        <ButtonPrimitive
            asChild={asChild}
            onClick={() => handleOpenChange(false)}
            className={clsx(`${rootClass}-action`, className)}
            {...getItemProps()}
            {...props}
        >
            {children}
        </ButtonPrimitive>
    );
};

export default AlertDialogAction;
