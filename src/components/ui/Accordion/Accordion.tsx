import React from 'react';
import AccordionRoot from './fragments/AccordionRoot';
import AccordionItem from './fragments/AccordionItem';
import AccordionHeader from './fragments/AccordionHeader';
import AccordionTrigger from './fragments/AccordionTrigger';
import AccordionContent from './fragments/AccordionContent';

export interface AccordionItemType {
    title: string;
    content: React.ReactNode;
  }

export interface AccordionProps {
    items: AccordionItemType[];
    variant?: string;
    color?: string;
  }

const Accordion = ({ items, variant = '', color = '' }: AccordionProps) => {
    return (
        <AccordionRoot variant={variant} color={color}>
            {items.map((item, index) => (
                <AccordionItem value={index} key={index} >
                    <AccordionHeader>
                        <AccordionTrigger>
                            {item.title}
                        </AccordionTrigger>
                    </AccordionHeader>
                    <AccordionContent>
                        {item.content}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </AccordionRoot>
    );
};

Accordion.Root = AccordionRoot;

export default Accordion;
