'use client';
import React, { useContext } from 'react';
import { clsx } from 'clsx';
import ButtonPrimitive from '~/core/primitives/Button';
import { DialogPrimitiveContext } from '../context/DialogPrimitiveContext';

export type DialogPrimitiveTriggerProps = {
    children: React.ReactNode;
    asChild?: boolean;
    className?: string;
}

const DialogPrimitiveTrigger = ({ children, asChild, className = '', ...props } : DialogPrimitiveTriggerProps) => {
    const { rootClass, handleOpenChange, getReferenceProps, refs } = useContext(DialogPrimitiveContext);

    return (
        <ButtonPrimitive
            ref={refs.setReference}
            asChild={asChild}
            onClick={() => handleOpenChange(true)}
            className={clsx(`${rootClass}-trigger`, className)}
            {...getReferenceProps()}
            {...props}
        >
            {children}
        </ButtonPrimitive>
    );
};

export default DialogPrimitiveTrigger;
