import { createContext } from 'react';

interface AccordionItemContextType {
    itemValue: string;
    disabled: boolean;
    headerId: string;
}

export const AccordionItemContext = createContext<AccordionItemContextType>({
    itemValue: '',
    disabled: false,
    headerId: ''
});
