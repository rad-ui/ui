import { createContext, useContext } from 'react';

/**
 * Context value for CollapsiblePrimitive
 *
 * This context provides a single source of truth for the open state
 * throughout the component tree. Only the Root component should control
 * the open state - child components like Trigger and Content should only
 * read from and update the context, not override it with local props.
 */
export type CollapsiblePrimitiveContextValue = {
  /**
   * Whether the collapsible is open
   */
  open: boolean;
  /**
   * Callback fired when the open state changes
   */
  onOpenChange: (open: boolean) => void;
  /**
   * Whether the collapsible is disabled
   */
  disabled?: boolean;
  /**
   * Unique ID for ARIA relationships
   */
  contentId: string;
  /**
   * Duration of the height transition animation in milliseconds
   */
  transitionDuration: number;
  /**
   * CSS timing function for the transition
   */
  transitionTimingFunction: string;
};

export const CollapsiblePrimitiveContext = createContext<CollapsiblePrimitiveContextValue | undefined>(undefined);

export const useCollapsiblePrimitiveContext = (): CollapsiblePrimitiveContextValue => {
    const context = useContext(CollapsiblePrimitiveContext);

    if (!context) {
        throw new Error(
            'Collapsible compound components must be used within a CollapsiblePrimitive.Root component'
        );
    }

    return context;
};
