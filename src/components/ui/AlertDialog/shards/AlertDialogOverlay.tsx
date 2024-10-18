import React, { useContext } from 'react';
import Floater from '~/core/primitives/Floater';
import { AlertDialogContext } from '../contexts/AlertDialogContext';

const AlertDialogOverlay = () => {
    const { isOpen, rootClass } = useContext(AlertDialogContext);
    return (
        <>
            {isOpen && (
                <Floater.Overlay className={`${rootClass}-overlay`}>

                </Floater.Overlay>
            )}
        </>
    );
};

export default AlertDialogOverlay;
