import { createContext, RefObject } from 'react';

/**
 * Type definition for the RovingFocusGroup context values
 * @property {string|null} focusedItemId - ID of the currently focused item
 * @property {Function} setFocusedItemId - Function to update the focused item ID
 * @property {string[]} focusItems - Array of all item IDs in the focus group
 * @property {Function} setFocusItems - Function to update the array of focus items
 * @property {Function} addFocusItem - Function to add a new item to the focus group
 * @property {RefObject<HTMLDivElement>|null} groupRef - Reference to the group container element
 */
export type RovingFocusGroupContextTypes = {
  focusedItemId: string | null;
  setFocusedItemId: (id: string | null) => void;
  focusItems: string[];
  setFocusItems: React.Dispatch<React.SetStateAction<string[]>>;
  addFocusItem: (id: string) => void;
  groupRef: RefObject<HTMLDivElement> | null;
}

/**
 * Context that manages the state for a single RovingFocusGroup
 * Tracks which items are in the group and which one is currently focused
 * Used by child RovingFocusItem components to coordinate focus management
 */
export const RovingFocusGroupContext = createContext<RovingFocusGroupContextTypes>({
    focusedItemId: null,
    setFocusedItemId: () => {},
    focusItems: [],
    setFocusItems: () => {},
    addFocusItem: () => {},
    groupRef: null
});
