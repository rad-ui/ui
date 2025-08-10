import { createContext } from 'react';

interface AccordionContextType {
    rootClass?: string | null;
    activeItems: string[];
    setActiveItems: (items: string[]) => void;
    accordionRef?: React.RefObject<HTMLDivElement | null>;
    transitionDuration?: number;
    transitionTimingFunction?: string;
    type?: 'single' | 'multiple';
    collapsible?: boolean;
    disabled?: boolean;
    dir?: 'ltr' | 'rtl';
    forceMount?: boolean;
    hiddenUntilFound?: boolean;
}

export const AccordionContext = createContext<AccordionContextType>({
    rootClass: '',
    activeItems: [],
    setActiveItems: () => {},
    accordionRef: undefined,
    transitionDuration: 0,
    transitionTimingFunction: 'ease-out',
    type: 'single',
    collapsible: true,
    disabled: false,
    dir: 'ltr',
    forceMount: false,
    hiddenUntilFound: false
});
