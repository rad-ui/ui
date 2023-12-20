import React, {useState} from 'react';
import AccordionRoot from './shards/AccordionRoot';
import AccordionItem from './shards/AccordionItem';
import AccordionHeader from './shards/AccordionHeader';
import AccordionTrigger from './shards/AccordionTrigger';
import AccordionContent from './shards/AccordionContent';

const Accordion = ({items}) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <AccordionRoot>
            {items.map((item, index) => (
                <AccordionItem value={index}>
                    <AccordionHeader>
                        <AccordionTrigger handleClick={handleClick} index={index} activeIndex={activeIndex} >
                            Item {index+1}
                        </AccordionTrigger>
                    </AccordionHeader>
                    <AccordionContent index={index} activeIndex={activeIndex}>
                        {item.content}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </AccordionRoot>
    );
};

Accordion.Root = AccordionRoot;

export default Accordion;
