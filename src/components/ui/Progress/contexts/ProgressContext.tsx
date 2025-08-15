import { createContext } from 'react';

type ProgressContextType = {
    value: number | null;
    minValue: number;
    maxValue: number;
    rootClass: string;
    getValueLabel?: (value: number, minValue: number, maxValue: number) => string;
    ariaLabel: string;
    state: 'loading' | 'complete' | 'indeterminate';
};

export const ProgressContext = createContext<ProgressContextType>({
    value: 0,
    minValue: 0,
    maxValue: 100,
    rootClass: '',
    ariaLabel: '',
    state: 'loading'
});
