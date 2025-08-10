'use client';
import { clsx } from 'clsx';
import React, { useContext } from 'react';
import { AccordionContext } from '../contexts/AccordionContext';
import { AccordionItemContext } from '../contexts/AccordionItemContext';

import CollapsiblePrimitive from '~/core/primitives/Collapsible';

export type AccordionContentProps = {
    children: React.ReactNode;
    index?: number;
    className?: string;
    forceMount?: boolean;
    asChild?: boolean;
};

const AccordionContent: React.FC<AccordionContentProps> = ({
    children,
    index,
    className = '',
    forceMount = false,
    asChild = false
}: AccordionContentProps) => {
    const {
        activeItems,
        rootClass,
        hiddenUntilFound,
        forceMount: rootForceMount
    } = useContext(AccordionContext);
    const { itemValue } = useContext(AccordionItemContext);

    const isOpen = activeItems.includes(itemValue);
    const shouldRender = forceMount || rootForceMount || isOpen;
    const shouldHide = hiddenUntilFound && !isOpen;

    if (!shouldRender) {
        return null;
    }

    return (
        <CollapsiblePrimitive.Content
            asChild={asChild}
            className={clsx(`${rootClass}-content`, className)}
            id={`content-${index || itemValue}`}
            role="region"
            aria-labelledby={`section-${index || itemValue}`}
            aria-hidden={!isOpen}
            style={shouldHide ? { display: 'none' } : undefined}
            data-state={isOpen ? 'open' : 'closed'}
        >
            {children}
        </CollapsiblePrimitive.Content>
    );
};

export default AccordionContent;
