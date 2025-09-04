'use client';
import React, { useContext, forwardRef } from 'react';
import { clsx } from 'clsx';
import { AlertDialogContext } from '../contexts/AlertDialogContext';
import { DialogPrimitiveContext } from '~/core/primitives/Dialog/context/DialogPrimitiveContext';
import Floater from '~/core/primitives/Floater';
import { RemoveScroll } from 'react-remove-scroll';

export type AlertDialogOverlayProps = React.ComponentPropsWithoutRef<'div'> & {
    className?: string;
};

const AlertDialogOverlay = forwardRef<HTMLDivElement, AlertDialogOverlayProps>(({ className = '', ...props }, ref) => {
    const { rootClass } = useContext(AlertDialogContext);
    const { isOpen, handleOverlayClick } = useContext(DialogPrimitiveContext);

    if (!isOpen) return null;

    return (
        <RemoveScroll>
            <Floater.Overlay
                ref={ref}
                onClick={handleOverlayClick}
                className={clsx(`${rootClass}-overlay`, className)}
                {...props}
            />
        </RemoveScroll>
    );
});

AlertDialogOverlay.displayName = 'AlertDialogOverlay';

export default AlertDialogOverlay;
