'use client';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { ToastProviderContext, ToastItemContext } from '../contexts/ToastContext';
import type { ToastData } from '../contexts/ToastContext';

const SWIPE_THRESHOLD = 40;
const SWIPE_VELOCITY_THRESHOLD = 0.11;

export type ToastRootProps = {
    toast: ToastData;
    className?: string;
    children: React.ReactNode;
};

const ToastRoot: React.FC<ToastRootProps> = ({ toast, className, children }) => {
    const {
        rootClass,
        position,
        expand,
        isHovered,
        heights,
        gap,
        visibleToasts,
        updateHeight,
        removeToast,
    } = useContext(ToastProviderContext);

    const itemRef = useRef<HTMLLIElement>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const remainingRef = useRef<number>(toast.duration ?? 4000);
    const startTimeRef = useRef<number | null>(null);

    const [mounted, setMounted] = useState(false);
    const [leaving, setLeaving] = useState(false);
    const isDraggingRef = useRef(false);
    const pointerStartRef = useRef({ y: 0, time: 0 });
    const [swipeAmount, setSwipeAmount] = useState(0);

    const isTop = position.startsWith('top');
    const isExpanded = expand || isHovered;

    // ── Stacking math ───────────────────────────────────────────────────────
    const index = visibleToasts.findIndex((t) => t.id === toast.id);
    const isFront = index === 0;
    const isBehind = !isFront && !isExpanded;

    // Collapsed: lift by gap*index, scale down
    // Expanded: lift by sum of preceding heights + gaps
    let expandedOffsetY = 0;
    for (let i = 0; i < index; i++) {
        expandedOffsetY += (heights.get(visibleToasts[i]?.id) ?? 0) + gap;
    }
    const frontHeight = heights.get(visibleToasts[0]?.id) ?? 0;
    const collapsedY = gap * index;
    const offsetY = isExpanded ? expandedOffsetY : collapsedY;
    const scale = isExpanded ? 1 : 1 - index * 0.05;

    // ── Height measurement ──────────────────────────────────────────────────
    useEffect(() => {
        if (!itemRef.current) return;
        const el = itemRef.current;
        updateHeight(toast.id, el.getBoundingClientRect().height);
        const observer = new ResizeObserver(() => {
            updateHeight(toast.id, el.getBoundingClientRect().height);
        });
        observer.observe(el);
        return () => observer.disconnect();
    }, [toast.id, updateHeight]);

    // ── Enter animation ─────────────────────────────────────────────────────
    useEffect(() => {
        const raf = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(raf);
    }, []);

    // ── Document visibility pause ───────────────────────────────────────────
    const [isDocHidden, setIsDocHidden] = useState(() =>
        typeof document !== 'undefined' ? document.hidden : false
    );
    useEffect(() => {
        const handler = () => setIsDocHidden(document.hidden);
        document.addEventListener('visibilitychange', handler);
        return () => document.removeEventListener('visibilitychange', handler);
    }, []);

    // ── Dismiss ─────────────────────────────────────────────────────────────
    const dismiss = useCallback(() => {
        setLeaving(true);
        toast.onDismiss?.();
    }, [toast]);

    const dismissRef = useRef(dismiss);
    useEffect(() => { dismissRef.current = dismiss; }, [dismiss]);

    // ── Auto-dismiss timer ──────────────────────────────────────────────────
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

    // Remove from DOM after exit transition
    const handleTransitionEnd = useCallback((e: React.TransitionEvent<HTMLLIElement>) => {
        if (e.target !== itemRef.current) return;
        if (leaving) removeToast(toast.id);
    }, [leaving, removeToast, toast.id]);

    // ── Swipe ───────────────────────────────────────────────────────────────
    const onPointerDown = useCallback((e: React.PointerEvent<HTMLLIElement>) => {
        isDraggingRef.current = true;
        pointerStartRef.current = { y: e.clientY, time: Date.now() };
        itemRef.current?.setPointerCapture(e.pointerId);
        pauseTimer();
    }, [pauseTimer]);

    const onPointerMove = useCallback((e: React.PointerEvent<HTMLLIElement>) => {
        if (!isDraggingRef.current) return;
        const delta = e.clientY - pointerStartRef.current.y;
        const dismissDir = isTop ? -1 : 1;
        const amount = delta * dismissDir < 0 ? delta * 0.2 : delta;
        setSwipeAmount(amount);
        itemRef.current?.style.setProperty('--swipe-amount', `${amount}px`);
    }, [isTop]);

    const onPointerUp = useCallback((_e: React.PointerEvent<HTMLLIElement>) => {
        if (!isDraggingRef.current) return;
        isDraggingRef.current = false;
        const elapsed = Date.now() - pointerStartRef.current.time;
        const velocity = Math.abs(swipeAmount) / elapsed;
        const dismissDir = isTop ? -1 : 1;
        if (swipeAmount * dismissDir > 0 && (Math.abs(swipeAmount) >= SWIPE_THRESHOLD || velocity > SWIPE_VELOCITY_THRESHOLD)) {
            dismiss();
        } else {
            setSwipeAmount(0);
            itemRef.current?.style.setProperty('--swipe-amount', '0px');
            startTimer();
        }
    }, [swipeAmount, isTop, dismiss, startTimer]);

    // ── If not in visible list, don't render ────────────────────────────────
    if (index === -1) return null;

    const style: React.CSSProperties & Record<string, string | number> = {
        '--offset': `${offsetY}px`,
        '--scale': scale,
        '--swipe-amount': `${swipeAmount}px`,
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
                data-swiping={isDraggingRef.current && swipeAmount !== 0 ? '' : undefined}
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
