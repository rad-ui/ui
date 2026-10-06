import clsx from 'clsx';
import React, { useContext } from 'react';
import CollapsiblePrimitive from '~/core/primitives/Collapsible';
import { CollapsibleContext } from '../contexts/CollapsibleContext';

type CollapsibleTriggerElement = React.ElementRef<typeof CollapsiblePrimitive.Trigger>;
export type CollapsibleTriggerProps = React.ComponentPropsWithoutRef<
    typeof CollapsiblePrimitive.Trigger
>;

const CollapsibleTrigger = React.forwardRef<
    CollapsibleTriggerElement,
    CollapsibleTriggerProps
>(({ children, className, disabled, ...props }, forwardedRef) => {
    const { rootClass, disabled: rootDisabled } = useContext(CollapsibleContext);
    const triggerClass = rootClass ? `${rootClass}-trigger` : '';
    return (
        <CollapsiblePrimitive.Trigger
            ref={forwardedRef}
            className={clsx(triggerClass, className)}
            // Reflect the root's disabled state on the button so it is announced and not activatable.
            disabled={disabled ?? rootDisabled}
            {...props}
        >
            {children}
        </CollapsiblePrimitive.Trigger>
    );
});

CollapsibleTrigger.displayName = 'CollapsibleTrigger';

export default CollapsibleTrigger;
