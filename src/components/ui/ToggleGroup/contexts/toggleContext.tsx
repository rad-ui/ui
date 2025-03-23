import { createContext } from 'react';

/**
 * Type definition for the ToggleContext
 * @typedef ToggleContextType
 */
export type ToggleContextType = {
    /** Selection mode: 'single' or 'multiple' */
    type: 'single' | 'multiple';
    /** Array of currently active/selected toggle values */
    activeToggles: any[];
    /** Function to update the active toggles */
    setActiveToggles: (toggles: any[]) => void;
};

/**
 * Context for sharing toggle state between ToggleGroupRoot and ToggleItem components.
 * Provides selection state management for the toggle group.
 */
export const ToggleContext = createContext<ToggleContextType>({
    type: 'single',
    activeToggles: [],
    setActiveToggles: () => {}
});
