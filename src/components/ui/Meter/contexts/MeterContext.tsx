import { createContext } from 'react';

type MeterContextType = {
    value: number;
    minValue: number;
    maxValue: number;
    lowValue?: number;
    highValue?: number;
    optimumValue?: number;
    rootClass: string;
    /** The formatted value: getValueLabel, then format, if either is set. */
    valueText?: string;
    /** Value as a 0-100 percentage of the range. */
    percentage?: number;
    labelId?: string;
    setHasLabel?: (hasLabel: boolean) => void;
    state: 'normal' | 'low' | 'high' | 'optimum';
};

export const MeterContext = createContext<MeterContextType>({
    value: 0,
    minValue: 0,
    maxValue: 100,
    rootClass: '',
    state: 'normal'
});
