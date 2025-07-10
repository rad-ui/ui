import { createContext, RefObject } from 'react';

interface RadioGroupContextType {
    rootClass: string;
}

export const RadioGroupContext = createContext<RadioGroupContextType>({
    rootClass: ''
});
