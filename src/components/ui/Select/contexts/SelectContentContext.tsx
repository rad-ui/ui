import { createContext } from 'react';

/** The scrolling content element, so scroll arrows can watch and scroll it. */
export const SelectContentContext = createContext<HTMLElement | null>(null);
