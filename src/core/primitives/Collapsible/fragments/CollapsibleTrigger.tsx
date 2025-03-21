import React from 'react';
import Primitive from '~/core/primitives/Primitive';

export interface CollapsibleTriggerProps {
  /**
   * Content to be rendered inside the trigger
   */
  children?: React.ReactNode;
  /**
   * CSS class name for custom styling
   */
  className?: string;
  /**
   * For Polymorphic component support
   */
  asChild?: boolean;
  /**
   * Additional props to be spread on the trigger element
   */
  [key: string]: any;
}

const CollapsibleTrigger = React.forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
    ({ children, className, asChild = false, ...props }, forwardedRef) => {
        return (
            <Primitive.button
                aria-controls="collapsible-content"
                ref={forwardedRef}
                className={className}
                {...props}
            >
                {children}
            </Primitive.button>
        );
    }
);

CollapsibleTrigger.displayName = 'CollapsibleTrigger';

export default CollapsibleTrigger;
