import clsx from 'clsx';
import React, { ComponentPropsWithoutRef, ElementRef, useContext } from 'react';
import CollapsiblePrimitive from '~/core/primitives/Collapsible';
import { CollapsibleContext } from '../contexts/CollapsibleContext';

export type CollapsibleTriggerElement = ElementRef<typeof CollapsiblePrimitive.Trigger>;
export type CollapsibleTriggerProps = ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger> & { index?: number };

const CollapsibleTrigger = React.forwardRef<CollapsibleTriggerElement, CollapsibleTriggerProps>(({ children, className, ...props }, ref) => {
    const { rootClass } = useContext(CollapsibleContext);
    const triggerClass = rootClass ? `${rootClass}-trigger` : '';
    return (
        <CollapsiblePrimitive.Trigger ref={ref} className={clsx(triggerClass, className)} {...props}>
            {children}
        </CollapsiblePrimitive.Trigger>
    );
});

CollapsibleTrigger.displayName = 'CollapsibleTrigger';

export default CollapsibleTrigger;
