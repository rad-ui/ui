import { useEffect, useState } from 'react';

/**
 * Checks whether the given element is inside a <form>
 * @param element The DOM element to check
 * @returns true if the element is inside a form
 */
export function useIsInsideForm(element: HTMLElement | null): boolean {
  const [insideForm, setInsideForm] = useState(false);

  useEffect(() => {
    if (!element) {
      setInsideForm(false);
      return;
    }

    let current: HTMLElement | null = element;
    while (current) {
      if (current.tagName === 'FORM') {
        setInsideForm(true);
        return;
      }
      current = current.parentElement;
    }

    setInsideForm(false);
  }, [element]);

  return insideForm;
}

export default useIsInsideForm;
