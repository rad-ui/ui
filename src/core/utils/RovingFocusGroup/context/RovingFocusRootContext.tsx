import { createContext } from 'react';

// Define the type for the context
export type RovingFocusRootContextTypes = {
  direction: 'horizontal' | 'vertical';
  loop: boolean;
}

// Create context with proper type and default values
export const RovingFocusRootContext = createContext<RovingFocusRootContextTypes>({
    direction: 'horizontal',
    loop: true
});
