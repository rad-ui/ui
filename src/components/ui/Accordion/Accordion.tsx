import React, {useState} from 'react';
import AccordionRoot from './shards/AccordionRoot';
import AccordionItem from './shards/AccordionItem';
import AccordionHeader from './shards/AccordionHeader';
import AccordionTrigger from './shards/AccordionTrigger';
import AccordionContent from './shards/AccordionContent';

export type AccordionProps = {
    items: {content: any}[];
}

const Accordion = ({items} : AccordionProps) => {
    return (
        <AccordionRoot>
            {items.map((item, index) => (
                <AccordionItem value={index}>
                    <AccordionHeader>
                        <AccordionTrigger >
                            Item {index+1}
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
