'use client';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { ToastProviderContext, ToastItemContext } from '../contexts/ToastContext';
import type { ToastData } from '../contexts/ToastContext';

const SWIPE_THRESHOLD = 40;
const SWIPE_VELOCITY_THRESHOLD = 0.11;
const PEEK_PX = 12; // how many px each back card peeks above the front

export type ToastRootProps = {
    toast: ToastData;
    className?: string;
    children: React.ReactNode;
};

const ToastRoot: React.FC<ToastRootProps> = ({ toast, className, children }) => {
    const {
        rootClass, position, expand, isHovered,
        heights, gap, visibleToasts, updateHeight, removeToast,
    } = useContext(ToastProviderContext);

    const itemRef = useRef<HTMLLIElement>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const remainingRef = useRef<number>(toast.duration ?? 4000);
    const startTimeRef = useRef<number | null>(null);
    const [mounted, setMounted] = useState(false);
    const [leaving, setLeaving] = useState(false);
    const isDraggingRef = useRef(false);
    const pointerStartRef = useRef({ y: 0, time: 0 });
    const swipeYRef = useRef(0);

    const isTop = position.startsWith('top');
    const isExpanded = expand || isHovered;
    const index = visibleToasts.findIndex((t) => t.id === toast.id);
    const isFront = index === 0;
    const isBehind = !isFront && !isExpanded;

    const ownHeight = heights.get(toast.id) ?? 0;
    const frontHeight = heights.get(visibleToasts[0]?.id) ?? 0;

    let expandedOffsetY = 0;
    for (let i = 0; i < index; i++) {
        expandedOffsetY += (heights.get(visibleToasts[i]?.id) ?? 0) + gap;
    }

    // Height measurement
    useEffect(() => {
        if (!itemRef.current) return;
        const el = itemRef.current;
        const measure = () => {
            const h = el.getBoundingClientRect().height;
            if (h > 0) updateHeight(toast.id, h);
        };
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(el);
        return () => ro.disconnect();
    }, [toast.id, updateHeight]);

    // Enter
    useEffect(() => {
        const raf = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(raf);
    }, []);

    // Doc visibility
    const [isDocHidden, setIsDocHidden] = useState(() =>
        typeof document !== 'undefined' ? document.hidden : false
    );
    useEffect(() => {
        const h = () => setIsDocHidden(document.hidden);
        document.addEventListener('visibilitychange', h);
        return () => document.removeEventListener('visibilitychange', h);
    }, []);

    // Dismiss
    const dismiss = useCallback(() => { setLeaving(true); toast.onDismiss?.(); }, [toast]);
    const dismissRef = useRef(dismiss);
    useEffect(() => { dismissRef.current = dismiss; }, [dismiss]);

    // Timer
    const pauseTimer = useCallback(() => {
        if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
        if (startTimeRef.current !== null) {
            remainingRef.current -= Date.now() - startTimeRef.current;
            startTimeRef.current = null;
        }
    }, []);
    const startTimer = useCallback(() => {
        if (toast.persistent || remainingRef.current <= 0) return;
        startTimeRef.current = Date.now();
        timerRef.current = setTimeout(() => dismissRef.current(), remainingRef.current);
    }, [toast.persistent]);
    useEffect(() => {
        if (isExpanded || isDocHidden) { pauseTimer(); } else { startTimer(); }
        return pauseTimer;
    }, [isExpanded, isDocHidden, startTimer, pauseTimer]);

    // Remove after exit
    const handleTransitionEnd = useCallback((e: React.TransitionEvent<HTMLLIElement>) => {
        if (e.target !== itemRef.current) return;
        if (leaving) removeToast(toast.id);
    }, [leaving, removeToast, toast.id]);

    // Swipe
    const onPointerDown = useCallback((e: React.PointerEvent<HTMLLIElement>) => {
        isDraggingRef.current = true;
        pointerStartRef.current = { y: e.clientY, time: Date.now() };
        itemRef.current?.setPointerCapture(e.pointerId);
        pauseTimer();
    }, [pauseTimer]);
    const onPointerMove = useCallback((e: React.PointerEvent<HTMLLIElement>) => {
        if (!isDraggingRef.current || !itemRef.current) return;
        const delta = e.clientY - pointerStartRef.current.y;
        const dir = isTop ? -1 : 1;
        const sy = delta * dir < 0 ? delta * 0.2 : delta;
        swipeYRef.current = sy;
        itemRef.current.style.setProperty('--swipe-y', `${sy}px`);
        itemRef.current.setAttribute('data-swiping', '');
    }, [isTop]);
    const onPointerUp = useCallback((_e: React.PointerEvent<HTMLLIElement>) => {
        if (!isDraggingRef.current || !itemRef.current) return;
        isDraggingRef.current = false;
        itemRef.current.removeAttribute('data-swiping');
        const sy = swipeYRef.current;
        const elapsed = Date.now() - pointerStartRef.current.time;
        const vel = Math.abs(sy) / elapsed;
        const dir = isTop ? -1 : 1;
        if (sy * dir > 0 && (Math.abs(sy) >= SWIPE_THRESHOLD || vel > SWIPE_VELOCITY_THRESHOLD)) {
            dismiss();
        } else {
            swipeYRef.current = 0;
            itemRef.current.style.setProperty('--swipe-y', '0px');
            startTimer();
        }
    }, [isTop, dismiss, startTimer]);

    if (index === -1) return null;

    // Stacking math
    // scale: front=1, index1=0.95, index2=0.90
    // translateY (bottom positions): negative = move up
    //   collapsed: lift by PEEK*index, then compensate for scale shrink
    //   expanded:  lift by sum of preceding heights + gaps
    const scale = isExpanded ? 1 : Math.max(0.7, 1 - index * 0.05);
    const shrink = 1 - scale;
    const refHeight = frontHeight || ownHeight; // use front height for consistent peek

    let translateY: number;
    if (isExpanded) {
        translateY = isTop ? expandedOffsetY : -expandedOffsetY;
    } else {
        // bottom: move up (negative). top: move down (positive).
        const dir = isTop ? 1 : -1;
        translateY = dir * (index * PEEK_PX + shrink * refHeight);
    }

    const style: React.CSSProperties & Record<string, string | number> = {
        '--swipe-y': '0px',
        '--scale': scale,
        '--y': `${translateY}px`,
        '--front-height': `${frontHeight}px`,
        zIndex: 10 - index,
    };

    return (
        <ToastItemContext.Provider value={{ toast, index, isExpanded, isFront, isBehind, dismiss }}>
            <li
                ref={itemRef}
                role="status"
                aria-live={toast.variant === 'error' ? 'assertive' : 'polite'}
                aria-atomic="true"
                data-variant={toast.variant ?? 'default'}
                data-mounted={mounted ? '' : undefined}
                data-leaving={leaving ? '' : undefined}
                data-expanded={isExpanded ? '' : undefined}
                data-front={isFront ? '' : undefined}
                data-behind={isBehind ? '' : undefined}
                className={clsx(rootClass && `${rootClass}-item`, className)}
                style={style}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onTransitionEnd={handleTransitionEnd}
            >
                {children}
            </li>
        </ToastItemContext.Provider>
    );
};

ToastRoot.displayName = 'ToastRoot';
export default ToastRoot;
