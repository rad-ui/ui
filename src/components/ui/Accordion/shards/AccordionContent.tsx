import React, {useContext} from 'react';
import {AccordionContext} from '../contexts/AccordionContext';


type AccordionContentProps = {
  children: React.ReactNode;
  index: number,
  activeIndex: number,
  className? :string
};

const AccordionContent: React.FC<AccordionContentProps> = ({children, index, activeIndex, className=''}: AccordionContentProps) => {
    const {activeItem, rootClass} = useContext(AccordionContext);

    return (
        <div
            className={`${rootClass}-content ${className}`}
            id={`content-${index}`}
            role="region"
            aria-labelledby={`section-${index}`}
            hidden={activeItem !== index}>

            {children}

        </div>
    );
};

export default AccordionContent;
