import { useMemo } from 'react';

/**
 * Checks whether the given element is inside a <form>
 * @param element The DOM element to check
 * @returns true if the element is inside a form
 */
export function useIsInsideForm(element: HTMLElement | null): boolean {
    return useMemo(() => {
        if (!element) return false;

        let current: HTMLElement | null = element;
        while (current) {
            if (current.tagName === 'FORM') return true;
            current = current.parentElement;
        }
        return false;
    }, [element]);
}

export default useIsInsideForm;
