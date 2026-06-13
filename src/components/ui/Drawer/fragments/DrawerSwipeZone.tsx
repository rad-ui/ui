'use client';
import React, { forwardRef, useContext, useRef, useCallback } from 'react';
import clsx from 'clsx';
import { DrawerContext } from '../context/DrawerContext';

export type DrawerSwipeZoneProps = {
    className?: string;
    /**
     * How far (px) the user must drag in the open direction before the drawer opens.
     * @default 48
     */
    openThreshold?: number;
    /**
     * Width/height of the hit zone in px (the edge-hugging strip).
     * @default 20
     */
    size?: number;
    children?: React.ReactNode;
    style?: React.CSSProperties;
};

type DragState = {
    startX: number;
    startY: number;
};

const DrawerSwipeZone = forwardRef<HTMLDivElement, DrawerSwipeZoneProps>(({
    className = '',
    openThreshold = 48,
    size = 20,
    children,
    style,
}, ref) => {
    const { rootClass, swipeDirection, isOpen, onOpen } = useContext(DrawerContext);

    const dragRef = useRef<DragState | null>(null);
    const progressRef = useRef(0);
    const zoneRef = useRef<HTMLDivElement | null>(null);

    // swipeDirection is the DISMISS direction, so open = opposite
    const getInwardDelta = useCallback((dx: number, dy: number): number => {
        switch (swipeDirection) {
            case 'right':  return -dx;  // drawer from right  → drag left  to open
            case 'left':   return  dx;  // drawer from left   → drag right to open
            case 'bottom': return -dy;  // drawer from bottom → drag up    to open
            case 'top':    return  dy;  // drawer from top    → drag down  to open
        }
    }, [swipeDirection]);

    const updateZoneStyle = useCallback((progress: number) => {
        const el = zoneRef.current;
        if (!el) return;
        const peekPx = progress * 8;
        switch (swipeDirection) {
            case 'right':  el.style.transform = `translateX(${-peekPx}px)`; break;
            case 'left':   el.style.transform = `translateX(${peekPx}px)`;  break;
            case 'bottom': el.style.transform = `translateY(${-peekPx}px)`; break;
            case 'top':    el.style.transform = `translateY(${peekPx}px)`;  break;
        }
        el.style.setProperty('--swipe-progress', String(progress));
    }, [swipeDirection]);

    const resetZoneStyle = useCallback((animate: boolean) => {
        const el = zoneRef.current;
        if (!el) return;
        if (animate) {
            el.style.transition = 'transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)';
        }
        el.style.transform = '';
        el.style.removeProperty('--swipe-progress');
        if (animate) {
            const onEnd = () => {
                el.style.transition = '';
                el.removeEventListener('transitionend', onEnd);
            };
            el.addEventListener('transitionend', onEnd);
        }
    }, []);

    const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        if (e.button !== 0 || isOpen) return;
        e.currentTarget.setPointerCapture(e.pointerId);
        dragRef.current = { startX: e.clientX, startY: e.clientY };
        progressRef.current = 0;
        const el = zoneRef.current;
        if (el) el.style.transition = 'none';
    }, [isOpen]);

    const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        if (!dragRef.current) return;
        const dx = e.clientX - dragRef.current.startX;
        const dy = e.clientY - dragRef.current.startY;
        const inward = Math.max(0, getInwardDelta(dx, dy));
        const progress = Math.min(inward / openThreshold, 1);
        progressRef.current = progress;
        updateZoneStyle(progress);
    }, [getInwardDelta, openThreshold, updateZoneStyle]);

    const onPointerUp = useCallback(() => {
        if (!dragRef.current) return;
        dragRef.current = null;

        if (progressRef.current >= 1) {
            resetZoneStyle(false);
            onOpen();
        } else {
            resetZoneStyle(true);
        }
        progressRef.current = 0;
    }, [onOpen, resetZoneStyle]);

    // Browser interrupted the gesture — never open the drawer
    const onPointerCancel = useCallback(() => {
        if (!dragRef.current) return;
        dragRef.current = null;
        progressRef.current = 0;
        resetZoneStyle(true);
    }, [resetZoneStyle]);

    // Zone sits on the edge the drawer slides in FROM (opposite of swipeDirection)
    const edgeStyle: React.CSSProperties = (() => {
        const base: React.CSSProperties = {
            position: 'fixed',
            zIndex: 'var(--rad-ui-z-index-overlay)' as any,
            touchAction: 'none',
            userSelect: 'none',
        };
        switch (swipeDirection) {
            case 'right':  return { ...base, top: 0, right: 0,   bottom: 0, width:  size };
            case 'left':   return { ...base, top: 0, left: 0,    bottom: 0, width:  size };
            case 'bottom': return { ...base, left: 0, bottom: 0, right: 0,  height: size };
            case 'top':    return { ...base, left: 0, top: 0,    right: 0,  height: size };
        }
    })();

    if (isOpen) return null;

    return (
        <div
            ref={(node) => {
                zoneRef.current = node;
                if (typeof ref === 'function') ref(node);
                else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
            }}
            aria-hidden="true"
            data-direction={swipeDirection}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerCancel}
            style={{ ...edgeStyle, ...style }}
            className={clsx(rootClass && `${rootClass}-swipe-zone`, className)}
        >
            {children}
        </div>
    );
});

DrawerSwipeZone.displayName = 'DrawerSwipeZone';

export default DrawerSwipeZone;
