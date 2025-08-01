import React from 'react';
import ButtonPrimitive from '~/core/primitives/Button';
import { useCollapsiblePrimitiveContext } from '../contexts/CollapsiblePrimitiveContext';

export type CollapsiblePrimitiveTriggerProps = {
  /**
   * Content to be rendered inside the trigger
   */
  children?: React.ReactNode;
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
    ({ children, asChild = false, ...props }, forwardedRef) => {
        const { open, onOpenChange, disabled, contentId } = useCollapsiblePrimitiveContext();

        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            // Allow event to propagate while still calling onOpenChange
            props.onClick?.(event);
            if (!disabled) {
                onOpenChange(!open);
            }
        };

        return (
            <ButtonPrimitive
                aria-controls={contentId}
                aria-expanded={open}
                data-state={open ? 'open' : 'closed'}
                data-disabled={disabled ? 'true' : undefined}
                ref={forwardedRef}
                onClick={handleClick}
                asChild={asChild}
                {...props}
            >
                {children}
            </ButtonPrimitive>
        );
    }
);

CollapsiblePrimitiveTrigger.displayName = 'CollapsiblePrimitiveTrigger';

export default CollapsiblePrimitiveTrigger;
