import React, { useContext } from 'react';
import Floater from '~/core/primitives/Floater';
import { AlertDialogContext } from '../contexts/AlertDialogContext';

const AlertDialogOverlay = () => {
    const { isOpen } = useContext(AlertDialogContext);
    return (
        <>
            {isOpen && (
                <Floater.Overlay className="bg-black/50 relative z-50">

                </Floater.Overlay>
            )}
        </>
    );
};

export default AlertDialogOverlay;
