import { createContext } from 'react';

interface AccordionContextType {
    rootClass?: string | null;
    activeItem?: number | null;
    focusItem?: Element | null;
    setActiveItem: (item: number | null) => void;
    setFocusItem: (item: Element) => void;
    focusNextItem: () => void;
    focusPrevItem: () => void;
    accordionRef?: React.RefObject<HTMLDivElement | null>;
  }

export const AccordionContext = createContext<AccordionContextType>({
    rootClass: '',
    activeItem: null,
    focusItem: null,
    setActiveItem: () => {},
    setFocusItem: () => {},
    focusNextItem: () => {},
    focusPrevItem: () => {},
    accordionRef: undefined
});
