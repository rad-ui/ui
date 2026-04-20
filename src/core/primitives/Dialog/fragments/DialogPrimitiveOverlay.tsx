'use client';
import React, { forwardRef, useContext } from 'react';
import Floater from '~/core/primitives/Floater';
import { DialogPrimitiveContext } from '../context/DialogPrimitiveContext';

import { RemoveScroll } from 'react-remove-scroll';

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
    const { isOpen, handleOverlayClick, refs } = useContext(DialogPrimitiveContext);

    const shouldRender = isOpen || forceMount;
    const dataState = isOpen ? 'open' : 'closed';
    const floatingElement = (refs as { floating?: { current?: HTMLElement | null } }).floating?.current;

    return (
        <>
            {shouldRender && (
                <RemoveScroll enabled={isOpen} shards={floatingElement ? [floatingElement] : []}>
                    <Floater.Overlay
                        ref={ref}
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
                </RemoveScroll>
            )}
        </>
    );
});

DialogPrimitiveOverlay.displayName = 'DialogPrimitiveOverlay';

export default DialogPrimitiveOverlay;
