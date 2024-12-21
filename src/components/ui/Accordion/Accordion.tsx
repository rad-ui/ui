import React from 'react';
import AccordionRoot from './fragments/AccordionRoot';
import AccordionItem from './fragments/AccordionItem';
import AccordionHeader from './fragments/AccordionHeader';
import AccordionTrigger from './fragments/AccordionTrigger';
import AccordionContent from './fragments/AccordionContent';

export type AccordionProps = {
    items: {title: string, content: React.ReactNode}[];
}

const Accordion = ({ items } : AccordionProps) => {
    return (
        <AccordionRoot>
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
