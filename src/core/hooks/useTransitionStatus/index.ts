'use client';

import React from 'react';
import useLayoutEffect from '~/core/hooks/useLayoutEffect';

export type TransitionStatus = 'starting' | 'ending' | undefined;

const prefersReducedMotion = () => typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

type AnimatedElement = Element & { getAnimations?: (options?: { subtree?: boolean }) => Animation[] };

/** Exit animations worth waiting for: none under reduced motion, and never infinite or already finished ones. */
const exitAnimations = (element: AnimatedElement | null): Animation[] => {
    if (!element || typeof element.getAnimations !== 'function' || prefersReducedMotion()) return [];
    return element.getAnimations({ subtree: true }).filter((animation) => {
        const iterations = animation.effect?.getComputedTiming?.().iterations;
        return animation.playState !== 'finished' && iterations !== Infinity;
    });
};

/**
 * Keeps a popup mounted through its exit animation and reports where it is in
 * its enter/exit transition, for `data-starting-style` and `data-ending-style`.
 *
 * - Opening renders one frame with status `starting`, so CSS can set the start
 *   values that a transition then animates away from.
 * - Closing switches to `ending` and stays mounted until every CSS animation
 *   and transition on the element has finished; with none (or reduced motion,
 *   or only infinite animations), it unmounts at once.
 */
export const useTransitionStatus = (open: boolean, getElement: () => Element | null) => {
    const [mounted, setMounted] = React.useState(open);
    const [status, setStatus] = React.useState<TransitionStatus>(undefined);
    const getElementRef = React.useRef(getElement);
    getElementRef.current = getElement;
    const isFirstRunRef = React.useRef(true);

    useLayoutEffect(() => {
        const isFirstRun = isFirstRunRef.current;
        isFirstRunRef.current = false;
        if (open) {
            setMounted(true);
            // Something that starts open (defaultOpen) has nothing to animate from.
            if (isFirstRun) return;
            setStatus('starting');
            if (typeof requestAnimationFrame !== 'function') {
                setStatus(undefined);
                return;
            }
            const frame = requestAnimationFrame(() => setStatus(undefined));
            return () => cancelAnimationFrame(frame);
        }
        if (!isFirstRun) setStatus('ending');
    }, [open]);

    useLayoutEffect(() => {
        if (status !== 'ending') return;
        // Reading animations flushes styles, so a transition the ending attribute starts is included.
        const animations = exitAnimations(getElementRef.current() as AnimatedElement | null);
        const finish = () => {
            setMounted(false);
            setStatus(undefined);
        };
        if (!animations.length) {
            finish();
            return;
        }
        let cancelled = false;
        Promise.allSettled(animations.map((animation) => animation.finished)).then(() => {
            if (!cancelled) finish();
        });
        return () => { cancelled = true; };
    }, [status]);

    return {
        /** Whether the popup should render: open, or still running its exit animation. */
        mounted: open || mounted,
        status
    };
};

/** The data attributes for a transition status. */
export const getTransitionAttributes = (status: TransitionStatus) => ({
    'data-starting-style': status === 'starting' ? '' : undefined,
    'data-ending-style': status === 'ending' ? '' : undefined
});

export default useTransitionStatus;
