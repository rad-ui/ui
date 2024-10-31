import React, { useContext } from 'react';
import Floater from '~/core/primitives/Floater';
import { AlertDialogContext } from '../contexts/AlertDialogContext';

const AlertDialogOverlay = () => {
    const { isOpen, rootClass, handleOverlayClick } = useContext(AlertDialogContext);
    return (
        <>
            {isOpen && (
                <Floater.Overlay
                    className={`${rootClass}-overlay`} onClick={handleOverlayClick}>

                </Floater.Overlay>
            )}
        </>
    );
};

export default AlertDialogOverlay;
