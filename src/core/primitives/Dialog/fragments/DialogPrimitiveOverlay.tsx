'use client';
import React, { useContext } from 'react';
import Floater from '~/core/primitives/Floater';
import { DialogPrimitiveContext } from '../context/DialogPrimitiveContext';

import { RemoveScroll } from 'react-remove-scroll';

type DialogPrimitiveOverlayProps = {
    className?: string;
}

const DialogPrimitiveOverlay = ({ ...props }: DialogPrimitiveOverlayProps) => {
    const { isOpen, handleOverlayClick } = useContext(DialogPrimitiveContext);
    return (
        <>
            {isOpen && (
                <RemoveScroll>
                    <Floater.Overlay
                        onClick={handleOverlayClick}
                        {...props}
                    >
                    </Floater.Overlay>
                </RemoveScroll>
            )}
        </>
    );
};

export default DialogPrimitiveOverlay;
