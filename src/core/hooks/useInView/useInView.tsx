import { useRef, useEffect } from 'react';

type UseInViewOptions = {
  onEnter?: () => void;
  onLeave?: () => void;
  threshold?: number | number[];
  rootMargin?: string;
  root?: Document | Element | null; // Optional scroll container
};

/**
 * Utility to find the nearest scrollable ancestor.
 */
function getScrollParent(node: HTMLElement | null): HTMLElement | null {
    if (!node) return null;
    const overflowY = window.getComputedStyle(node).overflowY;
    if (overflowY === 'auto' || overflowY === 'scroll') {
        return node;
    }
    return getScrollParent(node.parentElement);
}

export function useInView<T extends HTMLElement>({
    onEnter,
    onLeave,
    threshold = 0,
    rootMargin = '0px',
    root
}: UseInViewOptions) {
    const ref = useRef<T | null>(null);

    useEffect(() => {
        if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
        if (!ref.current) return;

        // Auto-detect scroll parent if root not provided
        const resolvedRoot = root ?? getScrollParent(ref.current);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        onEnter?.();
                    } else {
                        onLeave?.();
                    }
                });
            },
            { threshold, rootMargin, root: resolvedRoot }
        );

        observer.observe(ref.current);

        return () => {
            if (ref.current) observer.unobserve(ref.current);
            observer.disconnect();
        };
    }, [onEnter, onLeave, threshold, rootMargin, root]);

    return ref;
}
