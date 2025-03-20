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
        const { result } = renderHook(() => useControllableState<string>('controlled', 'default'));
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
});
