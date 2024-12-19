import {createContext} from "react";

export type DisclosureContextType = {
   rootClass: string;
   activeItem: null;
   setActiveItem: (item: null) => void
}
export const DisclosureContext = createContext<DisclosureContextType>({} as DisclosureContextType)