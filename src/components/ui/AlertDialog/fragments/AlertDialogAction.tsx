'use client';
import React, { useContext, forwardRef } from 'react';
import { clsx } from 'clsx';
import { AlertDialogContext } from '../contexts/AlertDialogContext';
import { DialogPrimitiveContext } from '~/core/primitives/Dialog/context/DialogPrimitiveContext';
import ButtonPrimitive from '~/core/primitives/Button';

export type AlertDialogActionProps = React.ComponentPropsWithoutRef<'button'> & {
    asChild?: boolean;
    className?: string;
};

const AlertDialogAction = forwardRef<HTMLButtonElement, AlertDialogActionProps>(({ children, asChild, className = '', ...props }, ref) => {
    const { rootClass } = useContext(AlertDialogContext);
    const { handleOpenChange, getItemProps } = useContext(DialogPrimitiveContext);

    return (
        <ButtonPrimitive
            ref={ref}
            asChild={asChild}
            className={clsx(`${rootClass}-action`, className)}
            onClick={() => handleOpenChange(false)}
            {...getItemProps()}
            {...props}
        >
            {children}
        </ButtonPrimitive>
    );
});

AlertDialogAction.displayName = 'AlertDialogAction';

export default AlertDialogAction;
