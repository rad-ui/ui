import { createContext } from "react";

type DisclosureContextType = {
    rootClass: string;
    activeItem: null;
    setActiveItem: React.Dispatch<React.SetStateAction<null>>
    
}

export const DisclosureContext = createContext<DisclosureContextType>({} as DisclosureContextType)