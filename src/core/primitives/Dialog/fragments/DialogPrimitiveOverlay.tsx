'use client';
import React, { useContext } from 'react';
import Floater from '~/core/primitives/Floater';
import { DialogPrimitiveContext } from '../context/DialogPrimitiveContext';
import { clsx } from 'clsx';

type DialogPrimitiveOverlayProps = {
    className?: string;
}

const DialogPrimitiveOverlay = ({ className = '', ...props }: DialogPrimitiveOverlayProps) => {
    const { isOpen, rootClass, handleOverlayClick } = useContext(DialogPrimitiveContext);
    return (
        <>
            {isOpen && (
                <Floater.Overlay
                    className={clsx(`${rootClass}-overlay`, className)}
                    onClick={handleOverlayClick}
                    {...props}
                >
                </Floater.Overlay>
            )}
        </>
    );
};

export default DialogPrimitiveOverlay;
