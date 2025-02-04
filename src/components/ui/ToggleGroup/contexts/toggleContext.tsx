import { createContext } from 'react';

export type ToggleContextType = {
    type: 'single' | 'multiple';
    activeToggles: any[];
    setActiveToggles: (toggles: any[]) => void;
    nextItem: () => void;
    previousItem: () => void;
};

export const ToggleContext = createContext<ToggleContextType>({
    type: 'single',
    activeToggles: [],
    setActiveToggles: () => {},
    nextItem: () => {},
    previousItem: () => {}
});
