import { renderHook, act } from '@testing-library/react';
import { useControllableState } from './index';

describe('useControllableState', () => {
    // Test uncontrolled mode
    it('should initialize with defaultValue in uncontrolled mode', () => {
        const { result } = renderHook(() => useControllableState<string>(undefined, 'default'));
        expect(result.current[0]).toBe('default');
    });

    it('should update value when setValue is called in uncontrolled mode', () => {
        const { result } = renderHook(() => useControllableState<string>(undefined, 'default'));

        act(() => {
            result.current[1]('new value');
        });

        expect(result.current[0]).toBe('new value');
    });

    it('should call onChange when setValue is called in uncontrolled mode', () => {
        const onChange = jest.fn();
        const { result } = renderHook(() => useControllableState<string>(undefined, 'default', onChange));

        act(() => {
            result.current[1]('new value');
        });

        expect(onChange).toHaveBeenCalledWith('new value');
    });

    // Test controlled mode
    it('should use controlledValue when in controlled mode', () => {
        const { result } = renderHook(() => useControllableState<string>('controlled', 'default', jest.fn()));
        expect(result.current[0]).toBe('controlled');
    });

    it('should not update internal state when setValue is called in controlled mode', () => {
        const onChange = jest.fn();
        const { result } = renderHook(() => useControllableState<string>('controlled', 'default', onChange));

        act(() => {
            result.current[1]('new value');
        });

        // Value should remain controlled
        expect(result.current[0]).toBe('controlled');
        expect(onChange).toHaveBeenCalledWith('new value');
    });

    it('should work with functional updates in uncontrolled mode', () => {
        const { result } = renderHook(() => useControllableState<number>(undefined, 5));

        act(() => {
            result.current[1]((prev) => prev + 1);
        });

        expect(result.current[0]).toBe(6);
    });

    it('should work with functional updates in controlled mode', () => {
        const onChange = jest.fn();
        const { result } = renderHook(() => useControllableState<number>(10, 5, onChange));

        act(() => {
            result.current[1]((prev) => prev + 1);
        });

        // Value remains controlled
        expect(result.current[0]).toBe(10);
        // onChange gets called with the expected new value (11)
        expect(onChange).toHaveBeenCalledWith(11);
    });

    it('should update when controlledValue changes externally', () => {
        const initialProps: { value: string } = { value: 'first' };
        const { result, rerender } = renderHook(
            ({ value }) => useControllableState<string>(value, 'default', jest.fn()),
            { initialProps }
        );

        expect(result.current[0]).toBe('first');

        rerender({ value: 'second' });
        expect(result.current[0]).toBe('second');
    });

    it('should fall back to defaultValue when controlledValue becomes undefined', () => {
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const initialProps: { value: string | undefined } = { value: 'controlled' };
        const { result, rerender } = renderHook(
            ({ value }) => useControllableState<string>(value, 'default', jest.fn()),
            { initialProps }
        );

        expect(result.current[0]).toBe('controlled');

        rerender({ value: undefined });
        expect(result.current[0]).toBe('default');
        warnSpy.mockRestore();
    });

    it('should support switching from uncontrolled to controlled', () => {
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const initialProps: { value: string | undefined } = { value: undefined };
        const { result, rerender } = renderHook(
            ({ value }) => useControllableState<string>(value, 'default', jest.fn()),
            { initialProps }
        );

        expect(result.current[0]).toBe('default');

        act(() => {
            result.current[1]('local');
        });
        expect(result.current[0]).toBe('local');

        rerender({ value: 'controlled' });
        expect(result.current[0]).toBe('controlled');
        warnSpy.mockRestore();
    });

    it('should call onChange once per change with latest value', () => {
        const onChange = jest.fn();
        const { result } = renderHook(() => useControllableState<string>(undefined, 'default', onChange));

        act(() => {
            result.current[1]('first');
            result.current[1]('second');
        });

        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onChange).toHaveBeenNthCalledWith(1, 'first');
        expect(onChange).toHaveBeenNthCalledWith(2, 'second');
        expect(result.current[0]).toBe('second');
    });

    it('should handle transitions between null and undefined', () => {
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const initialProps: { value: string | null | undefined } = { value: null };
        const { result, rerender } = renderHook(
            ({ value }) => useControllableState<string | null>(value, 'default', jest.fn()),
            { initialProps }
        );

        expect(result.current[0]).toBeNull();

        rerender({ value: 'controlled' });
        expect(result.current[0]).toBe('controlled');

        rerender({ value: undefined });
        expect(result.current[0]).toBe('default');

        act(() => {
            result.current[1]('updated');
        });
        expect(result.current[0]).toBe('updated');

        rerender({ value: null });
        expect(result.current[0]).toBeNull();
        warnSpy.mockRestore();
    });
});
