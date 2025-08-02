import { renderHook, act } from '@testing-library/react';
import { useIsDocumentHidden } from './index';

// Mock document.hidden property
const mockDocumentHidden = jest.fn();
Object.defineProperty(document, 'hidden', {
    get: mockDocumentHidden,
    configurable: true
});

// Mock addEventListener and removeEventListener
const mockAddEventListener = jest.fn();
const mockRemoveEventListener = jest.fn();
Object.defineProperty(document, 'addEventListener', {
    value: mockAddEventListener,
    configurable: true
});
Object.defineProperty(document, 'removeEventListener', {
    value: mockRemoveEventListener,
    configurable: true
});

describe('useIsDocumentHidden', () => {
    let visibilityChangeCallbacks: (() => void)[] = [];

    beforeEach(() => {
        jest.clearAllMocks();
        visibilityChangeCallbacks = [];

        // Capture the callback function when addEventListener is called
        mockAddEventListener.mockImplementation((event, callback) => {
            if (event === 'visibilitychange') {
                visibilityChangeCallbacks.push(callback);
            }
        });
    });

    afterEach(() => {
        // Reset document.hidden to false
        mockDocumentHidden.mockReturnValue(false);
    });

    it('should return initial state based on document.hidden', () => {
        mockDocumentHidden.mockReturnValue(true);
        const { result } = renderHook(() => useIsDocumentHidden());
        expect(result.current).toBe(true);
    });

    it('should return false when document is visible', () => {
        mockDocumentHidden.mockReturnValue(false);
        const { result } = renderHook(() => useIsDocumentHidden());
        expect(result.current).toBe(false);
    });

    it('should return true when document is hidden', () => {
        mockDocumentHidden.mockReturnValue(true);
        const { result } = renderHook(() => useIsDocumentHidden());
        expect(result.current).toBe(true);
    });

    it('should add visibilitychange event listener on mount', () => {
        renderHook(() => useIsDocumentHidden());

        expect(mockAddEventListener).toHaveBeenCalledWith(
            'visibilitychange',
            expect.any(Function)
        );
    });

    it('should update state when visibility changes to hidden', () => {
        mockDocumentHidden.mockReturnValue(false);
        const { result } = renderHook(() => useIsDocumentHidden());

        expect(result.current).toBe(false);

        // Simulate document becoming hidden
        mockDocumentHidden.mockReturnValue(true);
        act(() => {
            if (visibilityChangeCallbacks[0]) {
                visibilityChangeCallbacks[0]();
            }
        });

        expect(result.current).toBe(true);
    });

    it('should update state when visibility changes to visible', () => {
        mockDocumentHidden.mockReturnValue(true);
        const { result } = renderHook(() => useIsDocumentHidden());

        expect(result.current).toBe(true);

        // Simulate document becoming visible
        mockDocumentHidden.mockReturnValue(false);
        act(() => {
            if (visibilityChangeCallbacks[0]) {
                visibilityChangeCallbacks[0]();
            }
        });

        expect(result.current).toBe(false);
    });

    it('should remove event listener on unmount', () => {
        const { unmount } = renderHook(() => useIsDocumentHidden());

        unmount();

        expect(mockRemoveEventListener).toHaveBeenCalledWith(
            'visibilitychange',
            expect.any(Function)
        );
    });

    it('should handle multiple visibility changes', () => {
        mockDocumentHidden.mockReturnValue(false);
        const { result } = renderHook(() => useIsDocumentHidden());

        expect(result.current).toBe(false);

        // First change: hidden
        mockDocumentHidden.mockReturnValue(true);
        act(() => {
            if (visibilityChangeCallbacks[0]) {
                visibilityChangeCallbacks[0]();
            }
        });
        expect(result.current).toBe(true);

        // Second change: visible
        mockDocumentHidden.mockReturnValue(false);
        act(() => {
            if (visibilityChangeCallbacks[0]) {
                visibilityChangeCallbacks[0]();
            }
        });
        expect(result.current).toBe(false);

        // Third change: hidden again
        mockDocumentHidden.mockReturnValue(true);
        act(() => {
            if (visibilityChangeCallbacks[0]) {
                visibilityChangeCallbacks[0]();
            }
        });
        expect(result.current).toBe(true);
    });

    it('should work with multiple hook instances', () => {
        mockDocumentHidden.mockReturnValue(false);

        const { result: result1 } = renderHook(() => useIsDocumentHidden());
        const { result: result2 } = renderHook(() => useIsDocumentHidden());

        expect(result1.current).toBe(false);
        expect(result2.current).toBe(false);

        // Change visibility - this should affect both instances
        mockDocumentHidden.mockReturnValue(true);
        act(() => {
            // Trigger both callbacks
            if (visibilityChangeCallbacks[0]) {
                visibilityChangeCallbacks[0]();
            }
            if (visibilityChangeCallbacks[1]) {
                visibilityChangeCallbacks[1]();
            }
        });

        expect(result1.current).toBe(true);
        expect(result2.current).toBe(true);
    });

    it('should handle rapid visibility changes', () => {
        mockDocumentHidden.mockReturnValue(false);
        const { result } = renderHook(() => useIsDocumentHidden());

        // Rapid changes
        act(() => {
            mockDocumentHidden.mockReturnValue(true);
            if (visibilityChangeCallbacks[0]) {
                visibilityChangeCallbacks[0]();
            }

            mockDocumentHidden.mockReturnValue(false);
            if (visibilityChangeCallbacks[0]) {
                visibilityChangeCallbacks[0]();
            }

            mockDocumentHidden.mockReturnValue(true);
            if (visibilityChangeCallbacks[0]) {
                visibilityChangeCallbacks[0]();
            }
        });

        expect(result.current).toBe(true);
    });

    it('should maintain state consistency across re-renders', () => {
        mockDocumentHidden.mockReturnValue(true);
        const { result, rerender } = renderHook(() => useIsDocumentHidden());

        expect(result.current).toBe(true);

        // Re-render the hook
        rerender();

        expect(result.current).toBe(true);

        // Change visibility after re-render
        mockDocumentHidden.mockReturnValue(false);
        act(() => {
            if (visibilityChangeCallbacks[0]) {
                visibilityChangeCallbacks[0]();
            }
        });

        expect(result.current).toBe(false);
    });
});
