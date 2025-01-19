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
  }

const Accordion = ({ items }: AccordionProps) => {
    return (
        <AccordionRoot>
            {items.map((item, index) => (
                <AccordionItem value={index} key={index} >
                    <AccordionHeader>
                        <AccordionTrigger >
                            {item.title}
                        </AccordionTrigger>
                    </AccordionHeader>
                    <AccordionContent index={index}>
                        {item.content}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </AccordionRoot>
    );
};

Accordion.Root = AccordionRoot;

export default Accordion;
