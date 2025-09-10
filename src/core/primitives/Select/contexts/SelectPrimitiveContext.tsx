import { createContext } from 'react';

export type SelectPrimitiveContextType = {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    handleSelect: (index: number | null) => void,
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
    activeIndex: number | null;
    setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
    selectedIndex: number | null;
    elementsRef: React.MutableRefObject<(HTMLElement | null)[]>;
    labelsRef: React.MutableRefObject<(string | null)[]>;
    valuesRef: React.MutableRefObject<(string | null)[]>;
    disabledIndices: number[];
    setDisabledIndices: React.Dispatch<React.SetStateAction<number[]>>;
    selectedLabel: string;
    isTypingRef: React.RefObject<boolean>;
    selectedItemRef: React.MutableRefObject<HTMLElement | null>;
    virtualItemRef: React.RefObject<HTMLElement | null>;
    hasSearch: boolean;
    setHasSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SelectPrimitiveContext = createContext<SelectPrimitiveContextType>({} as SelectPrimitiveContextType);
