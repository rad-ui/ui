'use client';
import React from 'react';
import AccordionRoot from './fragments/AccordionRoot';
import AccordionItem from './fragments/AccordionItem';
import AccordionHeader from './fragments/AccordionHeader';
import AccordionTrigger from './fragments/AccordionTrigger';
import AccordionContent from './fragments/AccordionContent';

export type AccordionProps = React.ComponentPropsWithoutRef<typeof AccordionRoot>;

export type AccordionCompound = typeof AccordionRoot & {
    Root: typeof AccordionRoot;
    Item: typeof AccordionItem;
    Header: typeof AccordionHeader;
    Trigger: typeof AccordionTrigger;
    Content: typeof AccordionContent;
};

export type { AccordionRootProps } from './fragments/AccordionRoot';
export type { AccordionItemProps } from './fragments/AccordionItem';
export type { AccordionHeaderProps } from './fragments/AccordionHeader';
export type { AccordionTriggerProps } from './fragments/AccordionTrigger';
export type { AccordionContentProps } from './fragments/AccordionContent';

const Accordion = Object.assign(AccordionRoot, {
    Root: AccordionRoot,
    Item: AccordionItem,
    Header: AccordionHeader,
    Trigger: AccordionTrigger,
    Content: AccordionContent
}) as AccordionCompound;

export default Accordion;
