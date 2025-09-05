import React, { ComponentPropsWithoutRef, ElementRef } from 'react';
import ButtonPrimitive from '~/core/primitives/Button';
import { useCollapsiblePrimitiveContext } from '../contexts/CollapsiblePrimitiveContext';

export type CollapsiblePrimitiveTriggerElement = ElementRef<typeof ButtonPrimitive>;
export type CollapsiblePrimitiveTriggerProps = ComponentPropsWithoutRef<typeof ButtonPrimitive>;

const CollapsiblePrimitiveTrigger = React.forwardRef<CollapsiblePrimitiveTriggerElement, CollapsiblePrimitiveTriggerProps>(
    ({ children, asChild = false, ...props }, forwardedRef) => {
        const { open, onOpenChange, disabled, contentId } = useCollapsiblePrimitiveContext();

        const handleClick = (event: React.MouseEvent<CollapsiblePrimitiveTriggerElement>) => {
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
