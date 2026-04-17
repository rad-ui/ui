import { createContext } from 'react';

export type DisclosureContextType = {
   rootClass: string;
   activeItem: number | null;
   setActiveItem: (item: number | null) => void;
   disclosureRef: any;
}
export const DisclosureContext = createContext<DisclosureContextType>({} as DisclosureContextType);
