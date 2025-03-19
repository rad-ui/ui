import { createContext, RefObject } from 'react';

// Define the type for the context
export type RovingFocusGroupContextTypes = {
  focusedItemId: string | null;
  setFocusedItemId: (id: string | null) => void;
  focusItems: string[];
  setFocusItems: React.Dispatch<React.SetStateAction<string[]>>;
  addFocusItem: (id: string) => void;
  groupRef: RefObject<HTMLDivElement> | null;
}

// Create context with proper type and default values
export const RovingFocusGroupContext = createContext<RovingFocusGroupContextTypes>({
    focusedItemId: null,
    setFocusedItemId: () => {},
    focusItems: [],
    setFocusItems: () => {},
    addFocusItem: () => {},
    groupRef: null
});
