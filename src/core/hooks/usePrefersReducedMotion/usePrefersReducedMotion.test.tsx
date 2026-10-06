import { renderHook, act } from '@testing-library/react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

describe('usePrefersReducedMotion', () => {
    const originalMatchMedia = window.matchMedia;

    afterEach(() => {
        window.matchMedia = originalMatchMedia;
    });

    it('reflects prefers-reduced-motion after mount', () => {
        window.matchMedia = jest.fn().mockReturnValue({
            matches: true,
            media: '(prefers-reduced-motion: reduce)',
            addEventListener: jest.fn(),
            removeEventListener: jest.fn()
        } as unknown as MediaQueryList);

        const { result } = renderHook(() => usePrefersReducedMotion());

        act(() => {});

        expect(result.current).toBe(true);
    });

    it('updates when the media query changes', () => {
        let changeHandler: (event: MediaQueryListEvent) => void = () => {};

        window.matchMedia = jest.fn().mockReturnValue({
            matches: false,
            media: '(prefers-reduced-motion: reduce)',
            addEventListener: jest.fn((_event, handler) => {
                changeHandler = handler;
            }),
            removeEventListener: jest.fn()
        } as unknown as MediaQueryList);

        const { result } = renderHook(() => usePrefersReducedMotion());

        act(() => {});

        expect(result.current).toBe(false);

        act(() => {
            changeHandler({ matches: true } as MediaQueryListEvent);
        });

        expect(result.current).toBe(true);
    });

    it('returns false when matchMedia is unavailable', () => {
        const matchMedia = window.matchMedia;

        Object.defineProperty(window, 'matchMedia', {
            configurable: true,
            value: undefined
        });

        const { result } = renderHook(() => usePrefersReducedMotion());

        act(() => {});

        expect(result.current).toBe(false);

        Object.defineProperty(window, 'matchMedia', {
            configurable: true,
            value: matchMedia
        });
    });

    it('cleans up the media query listener on unmount', () => {
        const removeEventListener = jest.fn();

        window.matchMedia = jest.fn().mockReturnValue({
            matches: false,
            media: '(prefers-reduced-motion: reduce)',
            addEventListener: jest.fn(),
            removeEventListener
        } as unknown as MediaQueryList);

        const { unmount } = renderHook(() => usePrefersReducedMotion());

        act(() => {});

        unmount();

        expect(removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
    });
});
