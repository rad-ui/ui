import { createContext } from 'react';

type SliderContextType = {
    rootClass: string;
    value: number;
    setValue: (value: number) => void;
    minValue: number;
    setMinValue: (value: number) => void;
    maxValue: number;
    setMaxValue: (value: number) => void;
};

export const SliderContext = createContext<SliderContextType>({
    rootClass: '',
    value: 0,
    setValue: () => {},
    minValue: 0,
    setMinValue: () => {},
    maxValue: 100,
    setMaxValue: () => {}
});
