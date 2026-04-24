'use client';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { ToastProviderContext, ToastItemContext } from '../contexts/ToastContext';
import type { ToastData } from '../contexts/ToastContext';
import { ToastState } from '../ToastState';

const SWIPE_THRESHOLD = 40;
const SWIPE_VELOCITY_THRESHOLD = 0.11;
const PEEK_PX = 14;
/** Sonner `TIME_BEFORE_UNMOUNT` — DOM removal after exit starts (styles.css drives motion). */
const TIME_BEFORE_UNMOUNT_MS = 200;

export type ToastRootProps = {
    toast: ToastData;
    className?: string;
    children: React.ReactNode;
};

const ToastRoot: React.FC<ToastRootProps> = ({ toast, className, children }) => {
    const {
        rootClass, position, expand, isHovered,
        heights, gap, visibleToasts, updateHeight, unlinkStackHeight, removeToast,
    } = useContext(ToastProviderContext);

    const itemRef = useRef<HTMLLIElement>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const remainingRef = useRef<number>(toast.duration ?? 4000);
    const startTimeRef = useRef<number | null>(null);
    const [mounted, setMounted] = useState(false);
    const [entering, setEntering] = useState(true);
    const [leaving, setLeaving] = useState(false);
    /** One frame: skip transform transition on restack / after another toast was removed without changing our index. */
    const [restackSkip, setRestackSkip] = useState(false);
    const prevIndexRef = useRef<number>(-1);
    const prevVisibleCountRef = useRef<number>(-1);
    const isDraggingRef = useRef(false);
    const pointerStartRef = useRef({ y: 0, time: 0 });
    const swipeYRef = useRef(0);

    const isTop = position.startsWith('top');
    const isExpanded = expand || isHovered;

    // Index among visible (non-leaving) toasts
    const index = visibleToasts.findIndex((t) => t.id === toast.id);
    const isFront = index === 0;
    const isBehind = !isFront && !isExpanded;
    const isOldest = index === visibleToasts.length - 1;

    // Heights — when the new front toast isn’t measured yet, use the ex-front’s height for
    // stack math so --y doesn’t animate from a wrong refH when frontHeight flips from 0 → real.
    const ownHeight = heights.get(toast.id) ?? 0;
    const measuredFrontHeight = heights.get(visibleToasts[0]?.id) ?? 0;
    const formerFrontHeight = visibleToasts[1]
        ? (heights.get(visibleToasts[1].id) ?? 0)
        : 0;
    const effectiveFrontHeight =
        measuredFrontHeight > 0
            ? measuredFrontHeight
            : (formerFrontHeight > 0 ? formerFrontHeight : ownHeight);

    // Expanded offset
    let expandedOffsetY = 0;
    for (let i = 0; i < index; i++) {
        expandedOffsetY += (heights.get(visibleToasts[i]?.id) ?? 0) + gap;
    }

    // ── Height measurement ──────────────────────────────────────────────────
    useEffect(() => {
        if (leaving) return;
        if (!itemRef.current) return;
        const el = itemRef.current;
        const measure = () => {
            const h = el.offsetHeight;
            if (h > 0) updateHeight(toast.id, h);
        };
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(el);
        return () => ro.disconnect();
    }, [toast.id, updateHeight, leaving]);

    // ── Enter: one rAF so CSS paints the off-screen state first ────────────
    useEffect(() => {
        const raf = requestAnimationFrame(() => {
            setMounted(true);
            // After enter animation (400ms), mark as no longer entering
            const t = setTimeout(() => setEntering(false), 420);
            return () => clearTimeout(t);
        });
        return () => cancelAnimationFrame(raf);
    }, []);

    useEffect(() => {
        const prevI = prevIndexRef.current;
        const prevN = prevVisibleCountRef.current;
        const n = visibleToasts.length;

        const pushedBack = prevI !== -1 && index > prevI && index !== -1 && !leaving;
        const removedOthers =
            prevN > n && index !== -1 && !leaving && index === prevI;
        // Another toast was removed and our stack index decreased — avoid animating the whole column (flicker).
        const indexDroppedAfterRemoval =
            prevN > n && index !== -1 && !leaving && prevI !== -1 && prevI > index;

        prevIndexRef.current = index;
        prevVisibleCountRef.current = n;

        if (pushedBack || removedOthers || indexDroppedAfterRemoval) {
            setRestackSkip(true);
            const id = requestAnimationFrame(() => setRestackSkip(false));
            return () => cancelAnimationFrame(id);
        }
    }, [index, leaving, visibleToasts.length]);

    // ── Document visibility ─────────────────────────────────────────────────
    const [isDocHidden, setIsDocHidden] = useState(() =>
        typeof document !== 'undefined' ? document.hidden : false
    );
    useEffect(() => {
        const h = () => setIsDocHidden(document.hidden);
        document.addEventListener('visibilitychange', h);
        return () => document.removeEventListener('visibilitychange', h);
    }, []);

    // ── Dismiss ─────────────────────────────────────────────────────────────
    const dismiss = useCallback(() => {
        if (leaving) return;
        unlinkStackHeight(toast.id);
        setLeaving(true);
        toast.onDismiss?.();
    }, [leaving, toast, unlinkStackHeight]);

    const dismissRef = useRef(dismiss);
    useEffect(() => { dismissRef.current = dismiss; }, [dismiss]);

    // Imperative dismiss (ToastState.dismiss / manager.dismiss) — same exit as Close / timer
    useEffect(() => {
        const unsub = ToastState.subscribeDismiss((id) => {
            if (id === '__all__') return;
            if (id === toast.id) dismissRef.current();
        });
        return unsub;
    }, [toast.id]);

    // ── Timer: only oldest toast ticks down when collapsed (FIFO) ───────────
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
        const shouldRun = !isDocHidden && (isOldest || isExpanded) && !leaving;
        if (shouldRun) { startTimer(); } else { pauseTimer(); }
        return pauseTimer;
    }, [isExpanded, isDocHidden, isOldest, leaving, startTimer, pauseTimer]);

    // ── Remove from list after Sonner-style delay (exit motion is CSS-driven) ─
    useEffect(() => {
        if (!leaving) return;
        const tid = window.setTimeout(() => removeToast(toast.id), TIME_BEFORE_UNMOUNT_MS);
        return () => clearTimeout(tid);
    }, [leaving, removeToast, toast.id]);

    // ── Swipe ───────────────────────────────────────────────────────────────
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

    // If not in visible list AND not leaving, don't render
    if (index === -1 && !leaving) return null;

    // ── Stacking math ───────────────────────────────────────────────────────
    const scale = isExpanded ? 1 : Math.max(0.82, 1 - index * 0.05);
    const shrink = 1 - scale;
    const refH = effectiveFrontHeight > 0 ? effectiveFrontHeight : ownHeight;

    let y: number;
    if (leaving) {
        // Collapsed: Sonner styles.css sets transform via [data-leaving] + front/back.
        // Expanded: keep a full slide so stacked layout doesn’t fight CSS.
        y = isExpanded ? (isTop ? -window.innerHeight : window.innerHeight) : 0;
    } else if (isExpanded) {
        y = isTop ? expandedOffsetY : -expandedOffsetY;
    } else {
        const dir = isTop ? 1 : -1;
        y = dir * (index * PEEK_PX + shrink * refH);
    }

    const style: React.CSSProperties & Record<string, string | number> = {
        '--swipe-y': '0px',
        '--scale': leaving ? 1 : scale,
        '--y': `${y}px`,
        '--front-height': `${measuredFrontHeight > 0 ? measuredFrontHeight : (formerFrontHeight > 0 ? formerFrontHeight : ownHeight)}px`,
        '--toast-index': index,
        '--toast-offset-y': `${isTop ? expandedOffsetY : -expandedOffsetY}px`,
        // Keep exiting toast above the stack so the card behind doesn’t flash through (was z-index 0).
        zIndex: leaving ? 1000 - index : 10 - index,
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
                data-entering={entering && isFront ? '' : undefined}
                data-restack-skip={restackSkip ? '' : undefined}
                data-leaving={leaving ? '' : undefined}
                data-expanded={isExpanded ? '' : undefined}
                data-front={isFront ? '' : undefined}
                data-behind={isBehind ? '' : undefined}
                className={clsx(rootClass && `${rootClass}-item`, className)}
                style={style}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
            >
                {children}
            </li>
        </ToastItemContext.Provider>
    );
};

ToastRoot.displayName = 'ToastRoot';
export default ToastRoot;
