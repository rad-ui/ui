import { createContext } from 'react';

type SwitchContextType = {
    checked: boolean;
    setChecked: (checked: boolean) => void;
    rootClass: string;
    disabled?: boolean;
};

export const SwitchContext = createContext<SwitchContextType>({
    checked: false,
    setChecked: () => {},
    rootClass: '',
    disabled: false
});
