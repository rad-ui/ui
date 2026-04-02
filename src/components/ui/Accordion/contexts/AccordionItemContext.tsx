import { createContext } from 'react';

interface AccordionItemContextType {
    itemValue: number | string;
    disabled: boolean;
    headerId: string;
}

export const AccordionItemContext = createContext<AccordionItemContextType>({
    itemValue: '',
    disabled: false,
    headerId: ''
});
