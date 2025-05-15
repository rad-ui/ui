import React, { useContext } from 'react';
import { clsx } from 'clsx';
import ButtonPrimitive from '~/core/primitives/Button';
import { AlertDialogContext } from '../contexts/AlertDialogContext';

export type AlertDialogTriggerProps = {
    children: React.ReactNode;
}

const AlertDialogTrigger = ({ children, asChild, ...props } : AlertDialogTriggerProps) => {
    const { rootClass, handleOpenChange, getReferenceProps, refs } = useContext(AlertDialogContext);

    return (
        <ButtonPrimitive
            ref={refs.setReference}
            asChild={asChild}
            onClick={() => handleOpenChange(true)}
            className={clsx(`${rootClass}-trigger`)}
            {...getReferenceProps()}
        >
            {children}
        </ButtonPrimitive>
    );
};

export default AlertDialogTrigger;
