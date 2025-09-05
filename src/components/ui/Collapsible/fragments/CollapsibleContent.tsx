import clsx from 'clsx';
import React, { ComponentPropsWithoutRef, ElementRef, useContext } from 'react';
import { CollapsibleContext } from '../contexts/CollapsibleContext';
import CollapsiblePrimitive from '~/core/primitives/Collapsible';

export type CollapsibleContentElement = ElementRef<typeof CollapsiblePrimitive.Content>;
export type CollapsibleContentProps = ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>;

const CollapsibleContent = React.forwardRef<CollapsibleContentElement, CollapsibleContentProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useContext(CollapsibleContext);
    const contentClass = rootClass ? `${rootClass}-content` : '';
    return (
        <CollapsiblePrimitive.Content ref={ref} className={clsx(contentClass, className)} {...props}>
            {children}
        </CollapsiblePrimitive.Content>
    );
});

CollapsibleContent.displayName = 'CollapsibleContent';

export default CollapsibleContent;
