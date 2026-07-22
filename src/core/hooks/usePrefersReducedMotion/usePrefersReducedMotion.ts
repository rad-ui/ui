import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Returns whether the user has enabled prefers-reduced-motion in their OS settings.
 * SSR-safe: returns false until mounted on the client, then reflects the media query.
 */
export function usePrefersReducedMotion(): boolean {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
            return;
        }

        const mediaQueryList = window.matchMedia(QUERY);

        const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
            setPrefersReducedMotion(event.matches);
        };

        handleChange(mediaQueryList);

        if (typeof mediaQueryList.addEventListener === 'function') {
            mediaQueryList.addEventListener('change', handleChange);
            return () => mediaQueryList.removeEventListener('change', handleChange);
        }

        mediaQueryList.addListener(handleChange);
        return () => mediaQueryList.removeListener(handleChange);
    }, []);

    return prefersReducedMotion;
}

export default usePrefersReducedMotion;
