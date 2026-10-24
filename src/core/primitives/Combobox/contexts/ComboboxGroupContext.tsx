import { createContext, useContext } from 'react';

export type ComboboxGroupContextType = {
    registerItem: (id: string, isVisible: boolean) => () => void;
    /** Id a GroupLabel renders with, so the group is named by it. */
    labelId?: string;
    setHasLabel?: (hasLabel: boolean) => void;
};

export const ComboboxGroupContext = createContext<ComboboxGroupContextType | null>(null);

export const useComboboxGroupContext = () => useContext(ComboboxGroupContext);
