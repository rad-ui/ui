import React, {useContext} from 'react';
import {AccordionContext} from '../contexts/AccordionContext';
import {AccordionItemContext} from '../contexts/AccordionItemContext';


type AccordionContentProps = {
  children: React.ReactNode;
  index: number,
  activeIndex: number,
  className? :string
};

const AccordionContent: React.FC<AccordionContentProps> = ({children, index, activeIndex, className=''}: AccordionContentProps) => {
    const {activeItem, rootClass} = useContext(AccordionContext);

    const {itemValue} = useContext(AccordionItemContext);

    return (
        <div
            className={`${rootClass}-content ${className}`}
            id={`content-${index}`}
            role="region"
            aria-labelledby={`section-${index}`}
            hidden={itemValue !== activeItem}>

            {children}

        </div>
    );
};

export default AccordionContent;
