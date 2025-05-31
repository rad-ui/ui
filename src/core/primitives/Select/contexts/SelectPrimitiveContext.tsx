import { createContext } from 'react';

export type SelectPrimitiveContextType = {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    selectedValue: string,
    setSelectedValue: React.Dispatch<React.SetStateAction<string>>
    handleSelect: (value: string) => void
    refs: {
        reference: React.RefObject<any>;
        floating: React.RefObject<any>;
        setReference: (node: any) => void;
        setFloating: (node: any) => void;
    };
    floatingStyles: React.CSSProperties;
    floatingContext: any;
    getReferenceProps: () => any;
    getFloatingProps: () => any;
    getItemProps: (userProps?: any) => any;
}

export const SelectPrimitiveContext = createContext<SelectPrimitiveContextType>({} as SelectPrimitiveContextType);
