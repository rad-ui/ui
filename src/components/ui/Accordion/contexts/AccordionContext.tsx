import { createContext } from 'react';

interface AccordionContextType {
    rootClass?: string | null;
    activeItem?: number | null;
    setActiveItem: (item: number | null) => void;
    accordionRef?: React.RefObject<HTMLDivElement | null>;
    transitionDuration?: number;
    transitionTimingFunction?: string;
}

export const AccordionContext = createContext<AccordionContextType>({
    rootClass: '',
    activeItem: null,
    setActiveItem: () => {},
    accordionRef: undefined,
    transitionDuration: 0,
    transitionTimingFunction: 'ease-out'
});
