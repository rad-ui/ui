import { renderHook } from '@testing-library/react';
import { useIsInsideForm } from './index';

describe('useIsInsideForm', () => {
    it('should return false when element is null', () => {
        const { result } = renderHook(() => useIsInsideForm(null));
        expect(result.current).toBe(false);
    });

    it('should return false when element is not inside a form', () => {
        const div = document.createElement('div');
        const { result } = renderHook(() => useIsInsideForm(div));
        expect(result.current).toBe(false);
    });

    it('should return true when element is directly inside a form', () => {
        const form = document.createElement('form');
        const input = document.createElement('input');
        form.appendChild(input);

        const { result } = renderHook(() => useIsInsideForm(input));
        expect(result.current).toBe(true);
    });

    it('should return true when element is nested deep inside a form', () => {
        const form = document.createElement('form');
        const div1 = document.createElement('div');
        const div2 = document.createElement('div');
        const input = document.createElement('input');

        form.appendChild(div1);
        div1.appendChild(div2);
        div2.appendChild(input);

        const { result } = renderHook(() => useIsInsideForm(input));
        expect(result.current).toBe(true);
    });

    it('should return false when element is outside a form', () => {
        const form = document.createElement('form');
        const div = document.createElement('div');
        const input = document.createElement('input');

        form.appendChild(div);
        document.body.appendChild(input);

        const { result } = renderHook(() => useIsInsideForm(input));
        expect(result.current).toBe(false);
    });
});
