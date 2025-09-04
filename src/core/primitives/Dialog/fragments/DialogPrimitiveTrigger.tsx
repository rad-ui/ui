'use client';
import React, { forwardRef, useContext } from 'react';
import ButtonPrimitive from '~/core/primitives/Button';
import { DialogPrimitiveContext } from '../context/DialogPrimitiveContext';
import Floater from '~/core/primitives/Floater';

export type DialogPrimitiveTriggerProps = {
    children: React.ReactNode;
    asChild?: boolean;
    className?: string;
}

const DialogPrimitiveTrigger = forwardRef<HTMLButtonElement, DialogPrimitiveTriggerProps>(({ children, asChild, className = '', ...props }, ref) => {
    const { handleOpenChange, getReferenceProps, refs } = useContext(DialogPrimitiveContext);

    const mergedRef = Floater.useMergeRefs([refs.setReference, ref]);

    return (
        <ButtonPrimitive
            ref={mergedRef}
            asChild={asChild}
            className={className}
            onClick={() => handleOpenChange(true)}
            {...getReferenceProps()}
            {...props}
        >
            {children}
        </ButtonPrimitive>
    );
});

DialogPrimitiveTrigger.displayName = 'DialogPrimitiveTrigger';

export default DialogPrimitiveTrigger;
