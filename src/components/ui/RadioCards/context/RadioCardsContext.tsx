import { createContext } from 'react';

export const RadioCardsContext = createContext({
    defaultChecked: null,
    rootClass: '',
    onChange: null
});
