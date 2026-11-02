'use client';
import React, { forwardRef, useContext } from 'react';
import Floater from '~/core/primitives/Floater';
import { DialogPrimitiveContext } from '../context/DialogPrimitiveContext';
import usePresence from '~/core/hooks/usePresence';

export type DialogPrimitiveOverlayProps = React.ComponentPropsWithoutRef<typeof Floater.Overlay> & {
    asChild?: boolean;
    forceMount?: boolean;
};

const DialogPrimitiveOverlay = forwardRef<HTMLDivElement, DialogPrimitiveOverlayProps>(({
    asChild = false,
    forceMount = false,
    children,
    onClick,
    ...props
}, ref) => {
    const { isOpen, handleOverlayClick } = useContext(DialogPrimitiveContext);

    const overlayRef = React.useRef<HTMLDivElement | null>(null);
    const mergedRef = Floater.useMergeRefs([ref, overlayRef]);
    // Stays mounted while the closing transition plays (#2290).
    const isPresent = usePresence(isOpen, overlayRef);
    const shouldRender = isPresent || forceMount;
    const dataState = isOpen ? 'open' : 'closed';

    return (
        <>
            {shouldRender && (
                <Floater.Overlay
                    ref={mergedRef}
                    lockScroll={isOpen}
                    onClick={(event) => {
                        onClick?.(event);

                        if (event.defaultPrevented) {
                            return;
                        }

                        handleOverlayClick();
                    }}
                    data-state={dataState}
                    {...props}
                >
                    {children}
                </Floater.Overlay>
            )}
        </>
    );
});

DialogPrimitiveOverlay.displayName = 'DialogPrimitiveOverlay';

export default DialogPrimitiveOverlay;
