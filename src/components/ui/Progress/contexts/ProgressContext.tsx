import { createContext } from 'react';

type ProgressContextType = {
    value: number;
    minValue: number;
    maxValue: number;
};

export const ProgressContext = createContext<ProgressContextType>({
    value: 0,
    minValue: 0,
    maxValue: 100
});
