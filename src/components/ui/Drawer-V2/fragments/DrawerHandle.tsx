'use client';
import React, { forwardRef, useContext, useRef, useState, useCallback, useEffect } from 'react';
import clsx from 'clsx';
import { DrawerContext } from '../context/DrawerContext';
import { DialogPrimitiveContext } from '~/core/primitives/Dialog/context/DialogPrimitiveContext';

export type DrawerHandleProps = {
    className?: string;
    /** Distance in px the user must drag outward before the drawer closes. Default: 80 */
    closeThreshold?: number;
};

const RUBBER_BAND_FACTOR = 0.2;

type DragState = {
    startX: number;
    startY: number;
};

const DrawerHandle = forwardRef<HTMLDivElement, DrawerHandleProps>(({
    className = '',
    closeThreshold = 80,
}, ref) => {
    const { rootClass, swipeDirection, markIntentionalClose } = useContext(DrawerContext);
    const { handleOpenChange, refs } = useContext(DialogPrimitiveContext);

    const dragRef = useRef<DragState | null>(null);
    // Live offset ref — avoids stale closure in onPointerUp
    const offsetRef = useRef(0);
    const [isSnappingBack, setIsSnappingBack] = useState(false);

    // Get the drawer content element to apply the drag transform directly
    const getContentEl = useCallback((): HTMLElement | null => {
        return (refs as any).floating?.current ?? null;
    }, [refs]);

    const applyTransform = useCallback((outwardPx: number) => {
        const el = getContentEl();
        if (!el) return;
        switch (swipeDirection) {
            case 'right':  el.style.transform = `translateX(${outwardPx}px)`;  break;
            case 'left':   el.style.transform = `translateX(${-outwardPx}px)`; break;
            case 'bottom': el.style.transform = `translateY(${outwardPx}px)`;  break;
            case 'top':    el.style.transform = `translateY(${-outwardPx}px)`; break;
        }
    }, [swipeDirection, getContentEl]);

    const applyRubberBand = useCallback((inwardPx: number) => {
        const el = getContentEl();
        if (!el) return;
        const net = inwardPx * RUBBER_BAND_FACTOR;
        switch (swipeDirection) {
            case 'right':  el.style.transform = `translateX(${-net}px)`;  break;
            case 'left':   el.style.transform = `translateX(${net}px)`;   break;
            case 'bottom': el.style.transform = `translateY(${-net}px)`;  break;
            case 'top':    el.style.transform = `translateY(${net}px)`;   break;
        }
    }, [swipeDirection, getContentEl]);

    const snapBack = useCallback(() => {
        const el = getContentEl();
        if (!el) return;
        offsetRef.current = 0;
        setIsSnappingBack(true);
        el.style.transition = 'transform 320ms cubic-bezier(0.34, 1.56, 0.64, 1)';
        el.style.transform = '';
        const onEnd = () => {
            el.style.transition = '';
            el.removeEventListener('transitionend', onEnd);
            setIsSnappingBack(false);
        };
        el.addEventListener('transitionend', onEnd);
    }, [getContentEl]);

    const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        if (e.button !== 0) return;
        e.currentTarget.setPointerCapture(e.pointerId);
        dragRef.current = { startX: e.clientX, startY: e.clientY };
        offsetRef.current = 0;
        setIsSnappingBack(false);
        // Clear any lingering transition so drag is instant
        const el = getContentEl();
        if (el) el.style.transition = 'none';
    }, [getContentEl]);

    const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        if (!dragRef.current) return;
        const dx = e.clientX - dragRef.current.startX;
        const dy = e.clientY - dragRef.current.startY;

        let outward: number;
        switch (swipeDirection) {
            case 'right':  outward =  dx; break;
            case 'left':   outward = -dx; break;
            case 'bottom': outward =  dy; break;
            case 'top':    outward = -dy; break;
        }

        if (outward >= 0) {
            offsetRef.current = outward;
            applyTransform(outward);
        } else {
            offsetRef.current = 0;
            applyRubberBand(Math.abs(outward));
        }
    }, [swipeDirection, applyTransform, applyRubberBand]);

    const onPointerUp = useCallback(() => {
        if (!dragRef.current) return;
        dragRef.current = null;

        if (offsetRef.current >= closeThreshold) {
            markIntentionalClose();
            const el = getContentEl();
            if (el) { el.style.transition = ''; el.style.transform = ''; }
            handleOpenChange(false);
        } else {
            snapBack();
        }
    }, [closeThreshold, markIntentionalClose, handleOpenChange, snapBack, getContentEl]);

    // Browser interrupted the gesture — never treat as intentional close
    const onPointerCancel = useCallback(() => {
        if (!dragRef.current) return;
        dragRef.current = null;
        offsetRef.current = 0;
        snapBack();
    }, [snapBack]);

    // Clean up inline styles if the drawer closes externally while dragging
    useEffect(() => {
        return () => {
            const el = getContentEl();
            if (el) { el.style.transition = ''; el.style.transform = ''; }
        };
    }, [getContentEl]);

    return (
        <div
            ref={ref}
            role="button"
            aria-label="Drag to close drawer"
            tabIndex={0}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerCancel}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    markIntentionalClose();
                    handleOpenChange(false);
                }
            }}
            data-direction={swipeDirection}
            data-snapping={isSnappingBack ? 'true' : undefined}
            className={clsx(rootClass && `${rootClass}-handle`, className)}
        >
            <div className={`${rootClass}-handle-grip`} aria-hidden="true" />
        </div>
    );
});

DrawerHandle.displayName = 'DrawerHandle';

export default DrawerHandle;
