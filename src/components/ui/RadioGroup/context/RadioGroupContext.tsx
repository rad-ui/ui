import { createContext } from 'react';

export const RadioGroupContext = createContext({
    defaultChecked: null,
    customRootClass: null,
    onChange: null
});
