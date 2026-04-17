import { createContext } from 'react';

type DialogContextType = {
    rootClass: string;
};

export const DialogContext = createContext<DialogContextType>({
    rootClass: ''
});
