import { createContext } from 'react';

export type DisclosureItemContextType = {
  itemValue: number;
  setItemValue: (value: number) => void;
  triggerId: string;
}

export const DisclosureItemContext = createContext<DisclosureItemContextType>({} as DisclosureItemContextType);
