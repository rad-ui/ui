import { createContext } from 'react';

interface AccordionContextType {
    rootClass?: string | null;
    activeItems?: number[] | null;
    setActiveItems: (items: number[]) => void;
    accordionRef?: React.RefObject<HTMLDivElement | null>;
    transitionDuration?: number;
    transitionTimingFunction?: string;
    openMultiple?: boolean;
}

export const AccordionContext = createContext<AccordionContextType>({
    rootClass: '',
    activeItems: [],
    setActiveItems: () => {},
    accordionRef: undefined,
    transitionDuration: 0,
    transitionTimingFunction: 'ease-out',
    openMultiple: false
});
