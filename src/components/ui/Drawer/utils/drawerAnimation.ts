'use client';

import { CLOSE_DURATION_MS, CLOSE_DURATION_VAR, OPEN_DURATION_MS, OPEN_DURATION_VAR } from '../constants';

/**
 * Parses a CSS time value (`400ms`, `0.4s`, `400`) into milliseconds.
 */
function parseCssTime(value: string | null | undefined): number | null {
    if (!value) return null;
    const trimmed = value.trim();
    if (!trimmed || trimmed === 'auto' || trimmed === 'normal') return null;

    const parsed = Number.parseFloat(trimmed);
    if (!Number.isFinite(parsed)) return null;

    if (trimmed.endsWith('ms')) return parsed;
    if (trimmed.endsWith('s')) return parsed * 1000;
    return parsed;
}

/**
 * Reads the authored transition duration from the stylesheet so the fallback
 * timer stays in step with the CSS even if a theme overrides the durations.
 */
export function readDrawerDurationMs(element: HTMLElement | null, kind: 'open' | 'close'): number {
    const fallback = kind === 'open' ? OPEN_DURATION_MS : CLOSE_DURATION_MS;
    if (!element || typeof window === 'undefined' || !window.getComputedStyle) return fallback;

    const property = kind === 'open' ? OPEN_DURATION_VAR : CLOSE_DURATION_VAR;
    const value = window.getComputedStyle(element).getPropertyValue(property);
    return parseCssTime(value) ?? fallback;
}

type AnimationCapableElement = HTMLElement & {
    getAnimations?: () => Animation[];
};

/**
 * Resolves once every animation currently running on `element` has finished.
 *
 * The Web Animations API is the primary signal, so the timing no longer depends
 * on a hand-maintained millisecond constant. The timeout is a fallback for
 * environments without `getAnimations` and for animations that never start.
 */
export function whenAnimationsFinish(
    element: HTMLElement | null,
    fallbackMs: number,
    signal?: AbortSignal,
): Promise<void> {
    return new Promise((resolve) => {
        if (signal?.aborted || !element) {
            resolve();
            return;
        }

        let settled = false;
        let timeoutId: ReturnType<typeof setTimeout> | undefined;
        let rafId: number | undefined;
        let onAbort: (() => void) | undefined;

        const finish = () => {
            if (settled) return;
            settled = true;
            if (timeoutId !== undefined) clearTimeout(timeoutId);
            if (rafId !== undefined) cancelAnimationFrame(rafId);
            if (signal && onAbort) signal.removeEventListener('abort', onAbort);
            resolve();
        };

        const cap = element as AnimationCapableElement;

        if (typeof cap.getAnimations !== 'function') {
            timeoutId = setTimeout(finish, fallbackMs);
        } else {
            let animations: Animation[] = [];
            try {
                animations = cap.getAnimations();
            } catch {
                animations = [];
            }

            // The timeout always runs as a safety net: an animation can be
            // replaced or cancelled, in which case its `finished` promise rejects.
            timeoutId = setTimeout(finish, fallbackMs);

            if (animations.length) {
                Promise.all(animations.map((animation) => animation.finished.catch(() => undefined)))
                    .then(finish);
            } else {
                // Nothing is animating, so settle on the next frame once any
                // styles committed in this tick have been picked up.
                rafId = requestAnimationFrame(finish);
            }
        }

        if (signal) {
            onAbort = finish;
            signal.addEventListener('abort', onAbort);
        }
    });
}
