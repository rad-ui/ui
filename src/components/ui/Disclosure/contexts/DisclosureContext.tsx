import { createContext } from 'react';

export type DisclosureContextType = {
   rootClass: string;
   activeItem: number | null;
   setActiveItem: (item: number | null) => void;
   focusItem: HTMLElement | null;
   setFocusItem: (node: HTMLElement | null) => void;
   disclosureRef: any;
   focusNextItem: () => void;
   focusPrevItem: () => void;
}
export const DisclosureContext = createContext<DisclosureContextType>({} as DisclosureContextType);
