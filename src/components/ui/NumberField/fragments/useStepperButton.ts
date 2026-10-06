import React, { useCallback, useEffect, useRef } from 'react';
import type { NumberFieldStepDirection } from '../contexts/NumberFieldContext';

const HOLD_DELAY_MS = 400;
const HOLD_INTERVAL_MS = 60;

/**
 * Press-and-hold stepping for NumberField increment/decrement buttons.
 * Pointer presses step immediately and keep stepping while held; keyboard /
 * assistive-technology activation (a click without a preceding pointer press)
 * steps once.
 */
export function useStepperButton(
    direction: NumberFieldStepDirection,
    handleStep: (opts: { direction: NumberFieldStepDirection; type: 'small' }) => boolean,
    enabled: boolean
) {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const pointerSteppedRef = useRef(false);
    const handleStepRef = useRef(handleStep);
    handleStepRef.current = handleStep;

    const stop = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        if (intervalRef.current) clearInterval(intervalRef.current);
        timeoutRef.current = null;
        intervalRef.current = null;
        if (typeof window !== 'undefined') {
            window.removeEventListener('pointerup', stop);
            window.removeEventListener('pointercancel', stop);
            window.removeEventListener('blur', stop);
        }
    }, []);

    useEffect(() => stop, [stop]);

    useEffect(() => {
        if (!enabled) stop();
    }, [enabled, stop]);

    const step = () => handleStepRef.current({ direction, type: 'small' });

    const onPointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
        if (!enabled || event.button !== 0) return;
        pointerSteppedRef.current = true;
        stop();
        if (!step()) return;
        window.addEventListener('pointerup', stop);
        window.addEventListener('pointercancel', stop);
        window.addEventListener('blur', stop);
        timeoutRef.current = setTimeout(() => {
            intervalRef.current = setInterval(() => {
                if (!step()) stop();
            }, HOLD_INTERVAL_MS);
        }, HOLD_DELAY_MS);
    };

    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const fromPointer = pointerSteppedRef.current;
        pointerSteppedRef.current = false;
        // A pointer press already stepped; ignore its trailing click. Keyboard and
        // assistive-technology activation dispatches clicks with detail === 0.
        if (fromPointer && event.detail !== 0) return;
        if (!enabled) return;
        step();
    };

    return { onPointerDown, onClick, onPointerLeave: stop };
}
