import {createContext, useContext} from 'react';

interface ProgressContextProps {
    value: number
    maxValue: number
    minValue: number
}

export const ProgressContext = createContext<ProgressContextProps | null>(null);

export function useProgressContext() {
    const ctx= useContext(ProgressContext);

    if (!ctx) throw new Error('You should useProgress context in ProgressContext.Provider');

    return ctx;
}

