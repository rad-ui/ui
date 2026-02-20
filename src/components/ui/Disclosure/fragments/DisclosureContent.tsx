import React, { useContext } from 'react';
import clsx from 'clsx';
import { DisclosureContext } from '../contexts/DisclosureContext';
import { DisclosureItemContext } from '../contexts/DisclosureItemContext';
import CollapsiblePrimitive from '~/core/primitives/Collapsible';

export type DisclosureContentProps = React.ComponentPropsWithoutRef<'div'>;

const DisclosureContent = React.forwardRef<React.ElementRef<'div'>, DisclosureContentProps>(({ children, className = '', ...props }, forwardedRef) => {
    const { activeItem, rootClass } = useContext(DisclosureContext);
    const { itemValue } = useContext(DisclosureItemContext);
    return (
        itemValue !== activeItem
            ? null
            : <CollapsiblePrimitive.Content
                {...props}
                ref={forwardedRef}
                className={clsx(`${rootClass}-content`, className)}

                role="region"
                aria-hidden={activeItem !== itemValue}
            >
                {children}
            </CollapsiblePrimitive.Content>
    );
});

DisclosureContent.displayName = 'DisclosureContent';

export default DisclosureContent;
