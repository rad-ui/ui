import { createContext } from 'react';

/**
 * Type definition for the RovingFocusRoot context values
 * @property {('horizontal'|'vertical')} direction - The navigation direction for arrow keys
 * @property {boolean} loop - Whether focus should loop from last to first item and vice versa
 */
export type RovingFocusRootContextTypes = {
  direction: 'horizontal' | 'vertical';
  loop: boolean;
}

/**
 * Context that manages the root-level configuration for the RovingFocusGroup
 * Provides direction and loop behavior settings to all nested groups and items
 */
export const RovingFocusRootContext = createContext<RovingFocusRootContextTypes>({
    direction: 'horizontal',
    loop: true
});
