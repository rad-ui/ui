import { createContext } from 'react';

interface AccordionItemContextType {
    itemValue: number;
    setItemValue: (value: number) => void;
    disabled: boolean;
}

export const AccordionItemContext = createContext<AccordionItemContextType>({
    itemValue: 0,
    setItemValue: () => {},
    disabled: false
});
