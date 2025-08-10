import { createContext } from 'react';

interface AccordionItemContextType {
    itemValue: string;
    setItemValue: (value: string) => void;
    disabled: boolean;
}

export const AccordionItemContext = createContext<AccordionItemContextType>({
    itemValue: '',
    setItemValue: () => {},
    disabled: false
});
