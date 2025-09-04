'use client';
import React, { useContext, forwardRef } from 'react';
import { clsx } from 'clsx';
import { AlertDialogContext } from '../contexts/AlertDialogContext';
import { DialogPrimitiveContext } from '~/core/primitives/Dialog/context/DialogPrimitiveContext';
import ButtonPrimitive from '~/core/primitives/Button';
import { useMergeRefs } from '@floating-ui/react';

export type AlertDialogTriggerProps = React.ComponentPropsWithoutRef<'button'> & {
    asChild?: boolean;
    className?: string;
};

const AlertDialogTrigger = forwardRef<HTMLButtonElement, AlertDialogTriggerProps>(({ children, asChild, className = '', ...props }, ref) => {
    const { rootClass } = useContext(AlertDialogContext);
    const { handleOpenChange, getReferenceProps, refs } = useContext(DialogPrimitiveContext);
    const mergedRef = useMergeRefs([refs.setReference as any, ref]);

    return (
        <ButtonPrimitive
            ref={mergedRef}
            asChild={asChild}
            className={clsx(`${rootClass}-trigger`, className)}
            onClick={() => handleOpenChange(true)}
            {...getReferenceProps()}
            {...props}
        >
            {children}
        </ButtonPrimitive>
    );
});

AlertDialogTrigger.displayName = 'AlertDialogTrigger';

export default AlertDialogTrigger;
