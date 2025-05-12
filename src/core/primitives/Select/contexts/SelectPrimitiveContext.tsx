import { createContext } from "react";

export type SelectPrimitiveContextType = {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    selectedValue: string,
    setSelectedValue: React.Dispatch<React.SetStateAction<string>>
    handleSelect: (value: string) => void
}

export const SelectPrimitiveContext = createContext<SelectPrimitiveContextType>({} as SelectPrimitiveContextType);