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
    selectedItemRef: React.RefObject<any>;
    setOffsetPositionValue: React.Dispatch<React.SetStateAction<number | undefined>>;
    activeItemValue: string;
    setActiveItemValue: React.Dispatch<React.SetStateAction<string>>;
}

export const SelectPrimitiveContext = createContext<SelectPrimitiveContextType>({} as SelectPrimitiveContextType);
