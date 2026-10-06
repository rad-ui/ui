import { createContext } from 'react';

type DialogContextType = {
    rootClass: string;
    titleId?: string;
    descriptionId?: string;
    setTitleId: (id: string | undefined) => void;
    setDescriptionId: (id: string | undefined) => void;
};

export const DialogContext = createContext<DialogContextType>({
    rootClass: '',
    titleId: undefined,
    descriptionId: undefined,
    setTitleId: () => {},
    setDescriptionId: () => {}
});
