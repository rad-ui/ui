'use client';
import React, { useContext } from 'react';
import Floater from '~/core/primitives/Floater';
import { AlertDialogContext } from '../contexts/AlertDialogContext';
import { clsx } from 'clsx';

type AlertDialogOverlayProps = {
    className?: string;
}

const AlertDialogOverlay = ({ className = '' }: AlertDialogOverlayProps) => {
    const { isOpen, rootClass, handleOverlayClick } = useContext(AlertDialogContext);
    return (
        <>
            {isOpen && (
                <Floater.Overlay
                    className={clsx(`${rootClass}-overlay`, className)}
                    onClick={handleOverlayClick}
                >
                </Floater.Overlay>
            )}
        </>
    );
};

export default AlertDialogOverlay;
