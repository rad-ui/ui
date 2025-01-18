import { clsx } from 'clsx';
import React, { useContext } from 'react';
import { AccordionContext } from '../contexts/AccordionContext';
import { AccordionItemContext } from '../contexts/AccordionItemContext';

type AccordionContentProps = {
  children: React.ReactNode;
  index: number,
  className? :string
};

const AccordionContent: React.FC<AccordionContentProps> = ({ children, index, className = '' }: AccordionContentProps) => {
    const { activeItem, rootClass } = useContext(AccordionContext);

    const { itemValue } = useContext(AccordionItemContext);

    const isOpen = activeItem === index;

    return (
        itemValue !== activeItem
            ? null
            : <div
                className={clsx(`${rootClass}-content`, className)}
                id={`content-${index}`}
                role="region"
                aria-labelledby={`section-${index}`}
                aria-hidden={!isOpen}
            >

                {children}

            </div>
    );
};

export default AccordionContent;
