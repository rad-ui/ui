import { createContext } from 'react';

export type DisclosureItemValue = number | string;

export type DisclosureContextType = {
   rootClass: string;
   activeItem: DisclosureItemValue | null;
   setActiveItem: (item: DisclosureItemValue | null) => void;
   disclosureRef: any;
}
export const DisclosureContext = createContext<DisclosureContextType>({} as DisclosureContextType);
