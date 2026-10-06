import { createContext } from 'react';

type PopoverContextType = {
    rootClass: string;
    titleId?: string;
    descriptionId?: string;
    setTitleId: (id: string | undefined) => void;
    setDescriptionId: (id: string | undefined) => void;
};

export const PopoverContext = createContext<PopoverContextType>({
    rootClass: '',
    titleId: undefined,
    descriptionId: undefined,
    setTitleId: () => {},
    setDescriptionId: () => {}
});
