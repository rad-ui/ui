import React, { useContext } from 'react';
import Floater from '~/core/primitives/Floater';
import { AlertDialogContext } from '../contexts/AlertDialogContext';
import { clsx } from 'clsx';

const AlertDialogOverlay = () => {
    const { isOpen, rootClass, handleOverlayClick } = useContext(AlertDialogContext);
    return (
        <>
            {isOpen && (
                <Floater.Overlay
                    className={clsx(`${rootClass}-overlay`)} onClick={handleOverlayClick}>

                </Floater.Overlay>
            )}
        </>
    );
};

export default AlertDialogOverlay;
