import React from 'react';
import Primitive from '~/core/primitives/Primitive';
import { useCollapsiblePrimitiveContext } from '../contexts/CollapsiblePrimitiveContext';

export type CollapsiblePrimitiveTriggerProps = {
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
   *
   * Note: open state, disabled state, and toggle functionality are
   * now automatically handled through context from CollapsiblePrimitive.Root
   */
  [key: string]: any;
};

const CollapsiblePrimitiveTrigger = React.forwardRef<HTMLButtonElement, CollapsiblePrimitiveTriggerProps>(
    ({ children, className, asChild = false, ...props }, forwardedRef) => {
        const { open, onOpenChange, disabled, contentId } = useCollapsiblePrimitiveContext();

        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            // Allow event to propagate while still calling onOpenChange
            props.onClick?.(event);
            if (!disabled) {
                onOpenChange(!open);
            }
        };

        return (
            <Primitive.button
                aria-controls={contentId}
                aria-expanded={open}
                data-state={open ? 'open' : 'closed'}
                data-disabled={disabled ? 'true' : undefined}
                ref={forwardedRef}
                className={className}
                onClick={handleClick}
                {...props}
            >
                {children}
            </Primitive.button>
        );
    }
);

CollapsiblePrimitiveTrigger.displayName = 'CollapsiblePrimitiveTrigger';

export default CollapsiblePrimitiveTrigger;
