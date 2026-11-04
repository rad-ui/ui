'use client';
import React, { forwardRef, useContext } from 'react';
import clsx from 'clsx';
import { AlertDialogContext } from '../contexts/AlertDialogContext';

import DialogPrimitive from '~/core/primitives/Dialog';
import { stateData } from '~/core/utils/stateAttributes';

type AlertDialogTriggerElement = React.ElementRef<typeof DialogPrimitive.Trigger>;
type DialogPrimitiveTriggerProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>;

export type AlertDialogTriggerProps = DialogPrimitiveTriggerProps & {
    className?: string;
    disabled?: boolean;
};

const AlertDialogTrigger = forwardRef<AlertDialogTriggerElement, AlertDialogTriggerProps>(({
    children,
    asChild,
    className = '',
    disabled = false,
    ...props
}, ref) => {
    const { rootClass, isOpen } = useContext(AlertDialogContext);

    const dataState = isOpen ? 'open' : 'closed';
    const dataDisabled = disabled ? '' : undefined;

    return (
        <DialogPrimitive.Trigger
            ref={ref}
            className={clsx(rootClass && `${rootClass}-trigger`, className)}
            asChild={asChild}
            disabled={disabled}
            {...stateData(dataState)}
            data-disabled={dataDisabled}
            {...props}
        >
            {children}
        </DialogPrimitive.Trigger>
    );
});

AlertDialogTrigger.displayName = 'AlertDialogTrigger';

export default AlertDialogTrigger;
