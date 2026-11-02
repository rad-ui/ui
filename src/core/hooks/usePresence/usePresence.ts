import { useState } from 'react';
import type { RefObject } from 'react';
import useLayoutEffect from '~/core/hooks/useLayoutEffect';

const prefersReducedMotion = () => typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** The element's own exit animations and transitions, skipping infinite ones that would never finish. */
const exitAnimations = (element: HTMLElement | null): Animation[] => {
    if (!element || typeof element.getAnimations !== 'function' || prefersReducedMotion()) {
        return [];
    }
    return element.getAnimations().filter((animation) => {
        const iterations = animation.effect?.getComputedTiming().iterations;
        return animation.playState !== 'finished' && iterations !== Infinity;
    });
};

/**
 * Keeps a part mounted after `present` turns false until its CSS exit transition or animation finishes,
 * so `[data-state="closed"]` styles get to play. Unmounts straight away when there is nothing to wait for
 * (no animation, reduced motion, or no `getAnimations` support). Reopening during the exit keeps it mounted.
 */
export function usePresence(present: boolean, elementRef: RefObject<HTMLElement | null>): boolean {
    const [mounted, setMounted] = useState(present);

    if (present && !mounted) {
        setMounted(true);
    }

    useLayoutEffect(() => {
        if (present || !mounted) {
            return;
        }

        // Reading the animations flushes styles, so a transition triggered by data-state="closed" is listed.
        const animations = exitAnimations(elementRef.current);
        if (animations.length === 0) {
            setMounted(false);
            return;
        }

        let cancelled = false;
        Promise.allSettled(animations.map((animation) => animation.finished)).then(() => {
            if (!cancelled) {
                setMounted(false);
            }
        });

        return () => {
            cancelled = true;
        };
    }, [present, mounted, elementRef]);

    return present || mounted;
}

export default usePresence;
