'use client';
import React, { forwardRef, useContext } from 'react';
import Floater from '~/core/primitives/Floater';
import { DialogPrimitiveContext } from '../context/DialogPrimitiveContext';

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

    const shouldRender = isOpen || forceMount;
    const dataState = isOpen ? 'open' : 'closed';

    return (
        <>
            {shouldRender && (
                <Floater.Overlay
                    ref={ref}
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
