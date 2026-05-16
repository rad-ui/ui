import { createContext } from 'react';

type PopoverContextType = {
    rootClass: string;
};

export const PopoverContext = createContext<PopoverContextType>({
    rootClass: ''
});
