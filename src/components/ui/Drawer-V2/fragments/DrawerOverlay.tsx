'use client';
import React, { forwardRef, useContext, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { DrawerContext } from '../context/DrawerContext';
import { DialogPrimitiveContext } from '~/core/primitives/Dialog/context/DialogPrimitiveContext';
import Floater from '~/core/primitives/Floater';
import { RemoveScroll } from 'react-remove-scroll';

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
    const { rootClass } = useContext(DrawerContext);
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
            }, EXIT_DURATION_MS);
        }

        return () => {
            if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
        };
    }, [isOpen]);

    if (!isVisible && !forceMount) return null;

    return (
        <RemoveScroll enabled={isOpen}>
            <Floater.Overlay
                ref={ref}
                onClick={handleOverlayClick}
                data-state={dataState}
                className={clsx(rootClass && `${rootClass}-overlay`, className)}
                {...props}
            />
        </RemoveScroll>
    );
});

DrawerOverlay.displayName = 'DrawerOverlay';

export default DrawerOverlay;
