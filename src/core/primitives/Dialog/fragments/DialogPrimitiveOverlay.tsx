'use client';
import React, { forwardRef, useContext } from 'react';
import Floater from '~/core/primitives/Floater';
import { DialogPrimitiveContext } from '../context/DialogPrimitiveContext';

import { RemoveScroll } from 'react-remove-scroll';

type DialogPrimitiveOverlayProps = {
    className?: string;
    asChild?: boolean;
    forceMount?: boolean;
    children?: React.ReactNode;
}

const DialogPrimitiveOverlay = forwardRef<HTMLDivElement, DialogPrimitiveOverlayProps>(({
    asChild = false,
    forceMount = false,
    children,
    ...props
}, ref) => {
    const { isOpen, handleOverlayClick } = useContext(DialogPrimitiveContext);

    const shouldRender = isOpen || forceMount;
    const dataState = isOpen ? 'open' : 'closed';

    return (
        <>
            {shouldRender && (
                <RemoveScroll>
                    <Floater.Overlay
                        ref={ref}
                        onClick={handleOverlayClick}
                        data-state={dataState}
                        {...props}
                    >
                        {children}
                    </Floater.Overlay>
                </RemoveScroll>
            )}
        </>
    );
});

DialogPrimitiveOverlay.displayName = 'DialogPrimitiveOverlay';

export default DialogPrimitiveOverlay;
