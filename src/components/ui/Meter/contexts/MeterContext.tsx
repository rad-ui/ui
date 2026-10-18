import { createContext } from 'react';

type MeterContextType = {
    value: number;
    minValue: number;
    maxValue: number;
    lowValue?: number;
    highValue?: number;
    optimumValue?: number;
    rootClass: string;
    state: 'normal' | 'low' | 'high' | 'optimum';
};

export const MeterContext = createContext<MeterContextType>({
    value: 0,
    minValue: 0,
    maxValue: 100,
    rootClass: '',
    state: 'normal'
});
