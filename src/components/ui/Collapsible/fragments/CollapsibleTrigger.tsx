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
>(({ children, className, ...props }, forwardedRef) => {
    const { rootClass } = useContext(CollapsibleContext);
    const triggerClass = rootClass ? `${rootClass}-trigger` : '';
    return (
        <CollapsiblePrimitive.Trigger
            ref={forwardedRef}
            className={clsx(triggerClass, className)}
            {...props}
        >
            {children}
        </CollapsiblePrimitive.Trigger>
    );
});

CollapsibleTrigger.displayName = 'CollapsibleTrigger';

export default CollapsibleTrigger;

