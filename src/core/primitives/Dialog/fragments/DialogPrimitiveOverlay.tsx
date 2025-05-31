'use client';
import React, { useContext } from 'react';
import Floater from '~/core/primitives/Floater';
import { DialogPrimitiveContext } from '../context/DialogPrimitiveContext';
import { clsx } from 'clsx';

import { RemoveScroll } from 'react-remove-scroll';

type DialogPrimitiveOverlayProps = {
    className?: string;
}

const DialogPrimitiveOverlay = ({ className = '', ...props }: DialogPrimitiveOverlayProps) => {
    const { isOpen, rootClass, handleOverlayClick } = useContext(DialogPrimitiveContext);
    return (
        <>
            {isOpen && (
                <RemoveScroll>
                    <Floater.Overlay
                        className={clsx(`${rootClass}-overlay`, className)}
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
