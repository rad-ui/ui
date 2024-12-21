import { createContext } from 'react';

type AccordionContextType = {
  rootClass: string;
  activeItem: number | null;
  setActiveItem: React.Dispatch<React.SetStateAction<number | null>>;
  focusItem: Element | null;
  setFocusItem: React.Dispatch<React.SetStateAction<Element | null>>;
  focusPrevItem: () => void;
  focusNextItem: () => void;
};

export const AccordionContext = createContext<AccordionContextType>({
    rootClass: '',
    activeItem: null,
    setActiveItem: () => {},
    focusItem: null,
    setFocusItem: () => {},
    focusPrevItem: () => {},
    focusNextItem: () => {}
});
