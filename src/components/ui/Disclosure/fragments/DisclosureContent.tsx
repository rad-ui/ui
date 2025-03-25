import React, { useContext } from 'react';
import clsx from 'clsx';
import { DisclosureContext } from '../contexts/DisclosureContext';
import { DisclosureItemContext } from '../contexts/DisclosureItemContext';
import CollapsiblePrimitive from '~/core/primitives/Collapsible';

export type DisclosureContentProps = {
      children: React.ReactNode;
      className?: string;

}

const DisclosureContent = ({ children, className = '' }:DisclosureContentProps) => {
    const { activeItem, rootClass } = useContext(DisclosureContext);
    const { itemValue } = useContext(DisclosureItemContext);
    return (
        itemValue !== activeItem
            ? null
            : <CollapsiblePrimitive.Content
                className={clsx(`${rootClass}-content`, className)}

                role="region"
                aria-hidden={activeItem !== itemValue}
            >
                {children}
            </CollapsiblePrimitive.Content>
    );
};

export default DisclosureContent;
