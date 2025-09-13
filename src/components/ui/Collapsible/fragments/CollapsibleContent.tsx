import clsx from 'clsx';
import React, { useContext } from 'react';
import { CollapsibleContext } from '../contexts/CollapsibleContext';
import CollapsiblePrimitive from '~/core/primitives/Collapsible';

type CollapsibleContentElement = React.ElementRef<typeof CollapsiblePrimitive.Content>;
export type CollapsibleContentProps = React.ComponentPropsWithoutRef<
    typeof CollapsiblePrimitive.Content
>;

const CollapsibleContent = React.forwardRef<
    CollapsibleContentElement,
    CollapsibleContentProps
>(({ children, className = '', ...props }, forwardedRef) => {
    const { rootClass } = useContext(CollapsibleContext);
    const contentClass = rootClass ? `${rootClass}-content` : '';
    return (
        <CollapsiblePrimitive.Content
            ref={forwardedRef}
            className={clsx(contentClass, className)}
            {...props}
        >
            {children}
        </CollapsiblePrimitive.Content>
    );
});

CollapsibleContent.displayName = 'CollapsibleContent';

export default CollapsibleContent;
