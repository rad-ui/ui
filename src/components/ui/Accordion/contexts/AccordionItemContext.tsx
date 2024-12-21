import { createContext, FocusEvent } from 'react';

type AccordionItemContextType = {
  itemValue: number | null;
  setItemValue: React.Dispatch<React.SetStateAction<number | null>>;
  handleBlurEvent: (e: FocusEvent<HTMLButtonElement>) => void;
  handleClickEvent: () => void;
  handleFocusEvent: () => void;
};

export const AccordionItemContext = createContext<AccordionItemContextType>({
    itemValue: null,
    setItemValue: () => {},
    handleBlurEvent: () => {},
    handleClickEvent: () => {},
    handleFocusEvent: () => {}
});
