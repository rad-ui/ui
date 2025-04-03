import { createContext } from 'react';

/**
 * Type definition for the RovingFocusRoot context values
 * @property {('horizontal'|'vertical')} orientation - The navigation orientation for arrow keys
 * @property {boolean} loop - Whether focus should loop from last to first item and vice versa
 */
export type RovingFocusRootContextTypes = {
  orientation: 'horizontal' | 'vertical';
  loop: boolean;
}

/**
 * Context that manages the root-level configuration for the RovingFocusGroup
 * Provides orientation and loop behavior settings to all nested groups and items
 */
export const RovingFocusRootContext = createContext<RovingFocusRootContextTypes>({
    orientation: 'horizontal',
    loop: true
});
