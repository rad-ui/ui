'use client';
import React, { useContext } from 'react';
import { DialogContext } from '../context/DialogContext';
import clsx from 'clsx';

import DialogPrimitive from '~/core/primitives/Dialog';

type DialogOverlayProps = {
    className?: string;
}

const DialogOverlay = ({ className = '' }: DialogOverlayProps) => {
    const { rootClass } = useContext(DialogContext);
    return (
        <>
            <DialogPrimitive.Overlay className={clsx(`${rootClass}-overlay`, className)}></DialogPrimitive.Overlay>
        </>
    );
};

export default DialogOverlay;
