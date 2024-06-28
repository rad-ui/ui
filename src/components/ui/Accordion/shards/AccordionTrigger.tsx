import React, {useContext, useState} from 'react';
import {AccordionContext} from '../contexts/AccordionContext';


type AccordionTriggerProps = {
  children: React.ReactNode;
  className?: string,
  index: number,
  activeIndex: number,
  handleClick: (index: number) => void
};

const AccordionTrigger: React.FC<AccordionTriggerProps> = ({children, handleClick, index, activeIndex, className=''}) => {
    const {setActiveItem, rootClass} = useContext(AccordionContext);
    return (

        <button
            className={`${rootClass}-trigger ${className}`}
            onClick={() => {
                setActiveItem(index);
            }}
            aria-expanded={activeIndex === index}
            aria-controls={`content-${index}`}
        >
            {children}
        </button>


    );
};

export default AccordionTrigger;
