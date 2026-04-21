'use client';
import React, { forwardRef, useContext, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { DrawerContext } from '../context/DrawerContext';
import { DialogPrimitiveContext } from '~/core/primitives/Dialog/context/DialogPrimitiveContext';
import Floater from '~/core/primitives/Floater';

type DrawerOverlayElement = React.ElementRef<'div'>;

export type DrawerOverlayProps = React.ComponentPropsWithoutRef<'div'> & {
    className?: string;
    forceMount?: boolean;
};

// Must match $close-duration in drawer.clarity.scss
const EXIT_DURATION_MS = 400;

const DrawerOverlay = forwardRef<DrawerOverlayElement, DrawerOverlayProps>(({
    className = '',
    forceMount = false,
    ...props
}, ref) => {
    const { rootClass, modal, disablePointerDismissal, onOpenChangeComplete, markIntentionalClose } = useContext(DrawerContext);
    const { isOpen, handleOverlayClick } = useContext(DialogPrimitiveContext);

    const [isVisible, setIsVisible] = useState(isOpen);
    const [dataState, setDataState] = useState<'open' | 'closed'>(isOpen ? 'open' : 'closed');
    const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (exitTimerRef.current) clearTimeout(exitTimerRef.current);

        if (isOpen) {
            setIsVisible(true);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => setDataState('open'));
            });
        } else {
            setDataState('closed');
            exitTimerRef.current = setTimeout(() => {
                setIsVisible(false);
                onOpenChangeComplete?.(false);
            }, EXIT_DURATION_MS);
        }

        return () => {
            if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
        };
    }, [isOpen, onOpenChangeComplete]);

    if (!isVisible && !forceMount) return null;

    const handleClick = disablePointerDismissal
        ? undefined
        : () => { markIntentionalClose(); handleOverlayClick(); };

    // modal=false or 'trap-focus': don't lock scroll
    const lockScroll = modal === true;

    return (
            <Floater.Overlay
                lockScroll={isOpen && lockScroll}
                ref={ref}
                onClick={handleClick}
                data-state={dataState}
                // When modal=false, overlay is invisible (no backdrop) but still present for z-index stacking
                style={modal === false ? { pointerEvents: 'none', background: 'transparent' } : undefined}
                className={clsx(rootClass && `${rootClass}-overlay`, className)}
                {...props}
            />
    );
});

DrawerOverlay.displayName = 'DrawerOverlay';

export default DrawerOverlay;
