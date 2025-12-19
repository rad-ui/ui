'use client';
import React from 'react';
import AccordionRoot from './fragments/AccordionRoot';
import AccordionItem from './fragments/AccordionItem';
import AccordionHeader from './fragments/AccordionHeader';
import AccordionTrigger from './fragments/AccordionTrigger';
import AccordionContent from './fragments/AccordionContent';

// Empty props type - only supporting fragment exports
export type AccordionProps = React.HTMLAttributes<HTMLDivElement> & {
    children?: React.ReactNode;
};

// Export all fragment types for type-safe API
export type { AccordionRootProps } from './fragments/AccordionRoot';
export type { AccordionItemProps } from './fragments/AccordionItem';
export type { AccordionHeaderProps } from './fragments/AccordionHeader';
export type { AccordionTriggerProps } from './fragments/AccordionTrigger';
export type { AccordionContentProps } from './fragments/AccordionContent';

// Empty implementation - we don't support direct usage
const Accordion = () => {
    console.warn('Direct usage of Accordion is not supported. Please use Accordion.Root, Accordion.Item, etc. instead. ');
    return null;
};

Accordion.Root = AccordionRoot;
Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;

export default Accordion;
