import React from 'react';
import AccordionRoot from './fragments/AccordionRoot';
import AccordionItem from './fragments/AccordionItem';
import AccordionHeader from './fragments/AccordionHeader';
import AccordionTrigger from './fragments/AccordionTrigger';
import AccordionContent from './fragments/AccordionContent';
import { isReactNode } from '~/core/types';

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
                            {isReactNode(item.title) ? item.title : 'Accordion title must be a valid string'}
                        </AccordionTrigger>
                    </AccordionHeader>
                    <AccordionContent>
                        {isReactNode(item.content) ? item.content : 'Accordion content must be a valid React element'}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </AccordionRoot>
    );
};

Accordion.Root = AccordionRoot;

export default Accordion;
