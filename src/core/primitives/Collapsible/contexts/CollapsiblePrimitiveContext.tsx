import React, { createContext, useContext } from 'react';

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
