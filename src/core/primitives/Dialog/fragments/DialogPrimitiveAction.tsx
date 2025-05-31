'use client';
import React, { useContext } from 'react';
import { DialogPrimitiveContext } from '../context/DialogPrimitiveContext';
import ButtonPrimitive from '~/core/primitives/Button';
import clsx from 'clsx';

export type AlertDialogActionProps = {
    children: React.ReactNode;
    asChild?: boolean;
    className?: string;
}

const DialogPrimitiveAction = ({ children, asChild, className = '', ...props } : DialogPrimitiveActionProps) => {
    const { rootClass, handleOpenChange, getItemProps } = useContext(DialogPrimitiveContext);
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

export default DialogPrimitiveAction;
