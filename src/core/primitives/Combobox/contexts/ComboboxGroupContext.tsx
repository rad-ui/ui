import { createContext, useContext } from 'react';

export type ComboboxGroupContextType = {
    registerItem: (id: string, isVisible: boolean) => () => void;
};

export const ComboboxGroupContext = createContext<ComboboxGroupContextType | null>(null);

export const useComboboxGroupContext = () => useContext(ComboboxGroupContext);
