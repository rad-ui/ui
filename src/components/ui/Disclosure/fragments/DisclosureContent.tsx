import React, { useContext } from 'react';
import clsx from 'clsx';
import { DisclosureContext } from '../contexts/DisclosureContext';
import { DisclosureItemContext } from '../contexts/DisclosureItemContext';
import CollapsiblePrimitive from '~/core/primitives/Collapsible';

export type DisclosureContentProps = React.ComponentPropsWithoutRef<'div'> & {
    /** Keep the content mounted while closed. */
    forceMount?: boolean;
};

const DisclosureContent = React.forwardRef<React.ElementRef<'div'>, DisclosureContentProps>(({ children, className = '', ...props }, forwardedRef) => {
    const { rootClass } = useContext(DisclosureContext);
    const { triggerId } = useContext(DisclosureItemContext);

    // Mounting, the open/close height animation, data-state and aria-hidden come from the
    // Collapsible primitive, so closing animates and then unmounts (unless forceMount).
    return (
        <CollapsiblePrimitive.Content
            {...props}
            ref={forwardedRef}
            className={clsx(rootClass && `${rootClass}-content`, className)}
            data-slot="disclosure-content"
            role="region"
            aria-labelledby={triggerId}
        >
            {children}
        </CollapsiblePrimitive.Content>
    );
});

DisclosureContent.displayName = 'DisclosureContent';

export default DisclosureContent;
