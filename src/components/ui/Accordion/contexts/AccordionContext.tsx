import { createContext } from 'react';

interface AccordionContextType {
    rootClass?: string | null;
    activeItems: (number | string)[];
    setActiveItems: (items: (number | string)[]) => void;
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
