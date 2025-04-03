import { createContext } from 'react';

interface AccordionItemContextType {
    itemValue: number | string;
    setItemValue: (value: number | string) => void;
    disabled: boolean;
}

export const AccordionItemContext = createContext<AccordionItemContextType>({
    itemValue: 0,
    setItemValue: () => {},
    disabled: false
});
