'use client';
import React, { useContext } from 'react';
import { AlertDialogContext } from '../contexts/AlertDialogContext';
import { clsx } from 'clsx';

import DialogPrimitive from '~/core/primitives/Dialog';

type AlertDialogOverlayProps = {
    className?: string;
}

const AlertDialogOverlay = ({ className = '' }: AlertDialogOverlayProps) => {
    const { rootClass } = useContext(AlertDialogContext);
    return (
        <>
            <DialogPrimitive.Overlay className={clsx(`${rootClass}-overlay`, className)}></DialogPrimitive.Overlay>
        </>
    );
};

export default AlertDialogOverlay;
