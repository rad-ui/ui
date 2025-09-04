'use client';
import React, { forwardRef, useContext } from 'react';
import Floater from '~/core/primitives/Floater';
import { DialogPrimitiveContext } from '../context/DialogPrimitiveContext';

import { RemoveScroll } from 'react-remove-scroll';

type DialogPrimitiveOverlayProps = {
    className?: string;
}

const DialogPrimitiveOverlay = forwardRef<HTMLDivElement, DialogPrimitiveOverlayProps>(({ ...props }, ref) => {
    const { isOpen, handleOverlayClick } = useContext(DialogPrimitiveContext);
    return (
        <>
            {isOpen && (
                <RemoveScroll>
                    <Floater.Overlay
                        ref={ref}
                        onClick={handleOverlayClick}
                        {...props}
                    >
                    </Floater.Overlay>
                </RemoveScroll>
            )}
        </>
    );
});

DialogPrimitiveOverlay.displayName = 'DialogPrimitiveOverlay';

export default DialogPrimitiveOverlay;
