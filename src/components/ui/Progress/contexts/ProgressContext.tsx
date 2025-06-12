import { createContext } from 'react';

type ProgressContextType = {
    value: number;
    minValue: number;
    maxValue: number;
    rootClass: string;
    size?: string;
    variant?: string;
};

export const ProgressContext = createContext<ProgressContextType>({
    value: 0,
    minValue: 0,
    maxValue: 100,
    rootClass: '',
    size: '',
    variant: '',
});
