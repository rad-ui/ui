'use client';
import React, { useContext } from 'react';
import ButtonPrimitive from '~/core/primitives/Button';
import { DialogPrimitiveContext } from '../context/DialogPrimitiveContext';

export type DialogPrimitiveTriggerProps = {
    children: React.ReactNode;
    asChild?: boolean;
    className?: string;
}

const DialogPrimitiveTrigger = ({ children, asChild, className = '', ...props } : DialogPrimitiveTriggerProps) => {
    const { handleOpenChange, getReferenceProps, refs } = useContext(DialogPrimitiveContext);

    return (
        <ButtonPrimitive
            ref={refs?.setReference || null}
            asChild={asChild}
            className={className}
            onClick={() => handleOpenChange(true)}
            {...getReferenceProps()}
            {...props}
        >
            {children}
        </ButtonPrimitive>
    );
};

export default DialogPrimitiveTrigger;
