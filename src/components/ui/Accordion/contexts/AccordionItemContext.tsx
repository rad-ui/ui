import { createContext } from 'react';

interface AccordionItemContextType {
    itemValue: number;
    setItemValue: (value: number) => void;
    handleBlurEvent: (e: React.FocusEvent<HTMLButtonElement>) => void;
    handleClickEvent: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleFocusEvent: (e: React.FocusEvent<HTMLButtonElement>) => void;
}

export const AccordionItemContext = createContext<AccordionItemContextType>({
    itemValue: 0,
    setItemValue: () => {},
    handleBlurEvent: () => {},
    handleClickEvent: () => {},
    handleFocusEvent: () => {}
});
