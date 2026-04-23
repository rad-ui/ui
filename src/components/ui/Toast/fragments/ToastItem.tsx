'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import type { ToastData, ToastPosition } from '../contexts/ToastContext';

export type ToastItemProps = {
    toast: ToastData;
    index: number;
    isExpanded: boolean;
    gap: number;
    /** Sum of heights of all toasts in front of this one + gaps (used when expanded). */
    expandedOffsetY: number;
    /** Height of the front (index 0) toast — back toasts match this height when collapsed. */
    frontHeight: number;
    rootClass: string;
    position: ToastPosition;
    onRemove: (id: string) => void;
    onHeightUpdate: (id: string, height: number) => void;
};

const SWIPE_THRESHOLD = 40; // px
const SWIPE_VELOCITY_THRESHOLD = 0.11; // px/ms

const isTopPosition = (position: ToastPosition) => position.startsWith('top');

const ToastItem: React.FC<ToastItemProps> = ({
    toast,
    index,
    isExpanded,
    gap,
    expandedOffsetY,
    frontHeight,
    rootClass,
    position,
    onRemove,
    onHeightUpdate,
}) => {
    const itemRef = useRef<HTMLLIElement>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const remainingRef = useRef<number>(toast.duration ?? 4000);
    const startTimeRef = useRef<number | null>(null);

    // mounted drives the enter animation — false = off-screen, true = in position
    const [mounted, setMounted] = useState(false);
    const [leaving, setLeaving] = useState(false);

    const isDraggingRef = useRef(false);
    const pointerStartRef = useRef({ y: 0, time: 0 });
    const [swipeAmount, setSwipeAmount] = useState(0);

    const isTop = isTopPosition(position);
    const isFront = index === 0;

    // ── Height measurement ──────────────────────────────────────────────────
    useEffect(() => {
        if (!itemRef.current) return;
        const el = itemRef.current;
        // Measure immediately on mount
        onHeightUpdate(toast.id, el.getBoundingClientRect().height);
        // Watch for content changes (e.g. description wrapping)
        const observer = new ResizeObserver(() => {
            onHeightUpdate(toast.id, el.getBoundingClientRect().height);
        });
        observer.observe(el);
        return () => observer.disconnect();
    }, [toast.id, onHeightUpdate]);

    // ── Enter animation ─────────────────────────────────────────────────────
    // Defer one frame so the browser paints the off-screen position first,
    // then transitions to the stacked position.
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

    // ── Dismiss / leave ─────────────────────────────────────────────────────
    const triggerLeave = useCallback(() => {
        setLeaving(true);
        toast.onDismiss?.();
    }, [toast]);

    const triggerLeaveRef = useRef(triggerLeave);
    useEffect(() => { triggerLeaveRef.current = triggerLeave; }, [triggerLeave]);

    // ── Auto-dismiss timer ──────────────────────────────────────────────────
    const pauseTimer = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
        if (startTimeRef.current !== null) {
            remainingRef.current -= Date.now() - startTimeRef.current;
            startTimeRef.current = null;
        }
    }, []);

    const startTimer = useCallback(() => {
        if (toast.persistent || remainingRef.current <= 0) return;
        startTimeRef.current = Date.now();
        timerRef.current = setTimeout(() => {
            triggerLeaveRef.current();
        }, remainingRef.current);
    }, [toast.persistent]);

    useEffect(() => {
        if (isExpanded || isDocHidden) {
            pauseTimer();
        } else {
            startTimer();
        }
        return pauseTimer;
    }, [isExpanded, isDocHidden, startTimer, pauseTimer]);

    // Remove from DOM after exit transition completes
    const handleTransitionEnd = useCallback((e: React.TransitionEvent<HTMLLIElement>) => {
        if (e.target !== itemRef.current) return;
        if (leaving) onRemove(toast.id);
    }, [leaving, onRemove, toast.id]);

    // ── Swipe to dismiss ────────────────────────────────────────────────────
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
        const isAgainstDismiss = delta * dismissDir < 0;
        const amount = isAgainstDismiss ? delta * 0.2 : delta;
        setSwipeAmount(amount);
        itemRef.current?.style.setProperty('--swipe-amount', `${amount}px`);
    }, [isTop]);

    const onPointerUp = useCallback((_e: React.PointerEvent<HTMLLIElement>) => {
        if (!isDraggingRef.current) return;
        isDraggingRef.current = false;

        const elapsed = Date.now() - pointerStartRef.current.time;
        const velocity = Math.abs(swipeAmount) / elapsed;
        const dismissDir = isTop ? -1 : 1;
        const isDismissDirection = swipeAmount * dismissDir > 0;

        if (isDismissDirection && (Math.abs(swipeAmount) >= SWIPE_THRESHOLD || velocity > SWIPE_VELOCITY_THRESHOLD)) {
            triggerLeave();
        } else {
            setSwipeAmount(0);
            itemRef.current?.style.setProperty('--swipe-amount', '0px');
            startTimer();
        }
    }, [swipeAmount, isTop, triggerLeave, startTimer]);

    // ── Stacking variables (Emil / Sonner pattern) ──────────────────────────
    //
    // Collapsed:
    //   y = gap * index  (lifts each toast toward the back of the stack)
    //   scale = 1 - 0.05 * index
    //   height = frontHeight  (clamp so taller back toasts don't peek out)
    //
    // Expanded:
    //   y = sum of preceding toast heights + gaps
    //   scale = 1
    //   height = auto (natural)

    const collapsedY = gap * index;
    const scale = isExpanded ? 1 : 1 - index * 0.05;
    const offsetY = isExpanded ? expandedOffsetY : collapsedY;

    const style: React.CSSProperties & Record<string, string | number> = {
        '--index': index,
        '--toasts-before': index,
        '--offset': `${offsetY}px`,
        '--scale': scale,
        '--swipe-amount': `${swipeAmount}px`,
        '--front-height': `${frontHeight}px`,
        // z-index: front toast on top
        zIndex: 10 - index,
    };

    const isSwiping = isDraggingRef.current && swipeAmount !== 0;

    return (
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
            data-behind={!isFront && !isExpanded ? '' : undefined}
            data-swiping={isSwiping ? '' : undefined}
            className={clsx(rootClass && `${rootClass}-item`)}
            style={style}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onTransitionEnd={handleTransitionEnd}
        >
            <div
                className={clsx(rootClass && `${rootClass}-content`)}
            >
                {toast.title && (
                    <p className={clsx(rootClass && `${rootClass}-title`)}>
                        {toast.title}
                    </p>
                )}
                {toast.description && (
                    <p className={clsx(rootClass && `${rootClass}-description`)}>
                        {toast.description}
                    </p>
                )}
                {toast.action && (
                    <button
                        type="button"
                        className={clsx(rootClass && `${rootClass}-action`)}
                        onClick={() => {
                            toast.action!.onClick();
                            triggerLeave();
                        }}
                    >
                        {toast.action.label}
                    </button>
                )}
                <button
                    type="button"
                    aria-label="Close notification"
                    className={clsx(rootClass && `${rootClass}-close`)}
                    onClick={triggerLeave}
                >
                    ×
                </button>
            </div>
        </li>
    );
};

ToastItem.displayName = 'ToastItem';

export default ToastItem;
