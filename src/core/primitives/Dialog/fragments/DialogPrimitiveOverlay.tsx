'use client';
import React, { forwardRef, useContext } from 'react';
import Floater from '~/core/primitives/Floater';
import { DialogPrimitiveContext } from '../context/DialogPrimitiveContext';
import { useTransitionStatus, getTransitionAttributes } from '~/core/hooks/useTransitionStatus';
import { stateData } from '~/core/utils/stateAttributes';

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
    const { isOpen, handleOverlayClick, modal = true } = useContext(DialogPrimitiveContext);
    // Only a fully modal dialog locks scroll and lets the overlay take pointer input.
    const blocksPage = modal === true;

    const overlayRef = React.useRef<HTMLDivElement | null>(null);
    const mergedRef = Floater.useMergeRefs([overlayRef, ref]);
    const transition = useTransitionStatus(isOpen, () => overlayRef.current);
    const shouldRender = transition.mounted || forceMount;
    const dataState = isOpen ? 'open' : 'closed';

    return (
        <>
            {shouldRender && (
                <Floater.Overlay
                    ref={mergedRef}
                    lockScroll={isOpen && blocksPage}
                    onClick={(event) => {
                        onClick?.(event);

                        if (event.defaultPrevented) {
                            return;
                        }

                        handleOverlayClick();
                    }}
                    {...stateData(dataState)}
                    {...getTransitionAttributes(transition.status)}
                    {...props}
                    style={blocksPage ? props.style : { ...props.style, pointerEvents: 'none' }}
                >
                    {children}
                </Floater.Overlay>
            )}
        </>
    );
});

DialogPrimitiveOverlay.displayName = 'DialogPrimitiveOverlay';

export default DialogPrimitiveOverlay;
