import { createContext } from 'react';

export type ToggleContextType = {
    type: 'single' | 'multiple';
    activeToggles: any[];
    setActiveToggles: (toggles: any[]) => void;
};

export const ToggleContext = createContext<ToggleContextType>({});
