import React, { createContext } from 'react';

interface AccordionContextType {
    rootClass?: string | null;
    activeItems: (number | string)[];
    setActiveItems: React.Dispatch<React.SetStateAction<(number | string)[]>>;
    accordionRef?: React.RefObject<HTMLDivElement | null>;
    transitionDuration?: number;
    transitionTimingFunction?: string;
    openMultiple?: boolean;
    collapsible: boolean;
    /** Matches Radix: disables the entire accordion (all items non-interactive). */
    disabled: boolean;
    orientation: 'horizontal' | 'vertical';
}

export const AccordionContext = createContext<AccordionContextType>({
    rootClass: '',
    activeItems: [],
    setActiveItems: (() => {}) as React.Dispatch<React.SetStateAction<(number | string)[]>>,
    accordionRef: undefined,
    transitionDuration: 0,
    transitionTimingFunction: 'ease-out',
    openMultiple: false,
    collapsible: false,
    disabled: false,
    orientation: 'vertical'
});
