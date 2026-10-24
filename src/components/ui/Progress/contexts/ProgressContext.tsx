import { createContext } from 'react';

type ProgressContextType = {
    value: number | null;
    minValue: number;
    maxValue: number;
    rootClass: string;
    /** The formatted value: getValueLabel, then format, if either is set. */
    valueText?: string;
    /** Value as a 0-100 percentage of the range. */
    percentage?: number;
    labelId?: string;
    setHasLabel?: (hasLabel: boolean) => void;
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
