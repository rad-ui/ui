import { createContext } from "react";

export type SelectContextType = {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    selectedValue: string,
    setSelectedValue: React.Dispatch<React.SetStateAction<string>>
    handleSelect: (value: string) => void
}

export const SelectContext = createContext<SelectContextType>({} as SelectContextType);