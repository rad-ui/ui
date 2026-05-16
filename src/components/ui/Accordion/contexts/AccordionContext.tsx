import React, { createContext } from 'react';

interface AccordionContextType {
    rootClass?: string | null;
    activeItems: string[];
    setActiveItems: React.Dispatch<React.SetStateAction<string[]>>;
    accordionRef?: React.RefObject<HTMLDivElement | null>;
    multiple: boolean;
    collapsible: boolean;
    /** Matches Radix: disables the entire accordion (all items non-interactive). */
    disabled: boolean;
    orientation: 'horizontal' | 'vertical';
}

export const AccordionContext = createContext<AccordionContextType>({
    rootClass: '',
    activeItems: [],
    setActiveItems: (() => {}) as React.Dispatch<React.SetStateAction<string[]>>,
    accordionRef: undefined,
    multiple: false,
    collapsible: false,
    disabled: false,
    orientation: 'vertical'
});
