import React from 'react';
// @ts-ignore
import {customClassSwitcher} from '~/core';

type AccordionTriggerProps = {
  children: React.ReactNode;
  customRootClass:string,
  index: number,
    activeIndex: number,
  handleClick: (index: number) => void
};

const AccordionTrigger: React.FC<AccordionTriggerProps> = ({children, handleClick, index, activeIndex, customRootClass=''}) => {
    const rootClass = customClassSwitcher(customRootClass, 'Accordion');
    return (
        <span className={`${rootClass}-trigger`}>

            <button
                onClick={() => handleClick(index)}
                aria-expanded={activeIndex === index}
                aria-controls={`content-${index}`}
            >
                {children}
            </button>

        </span>
    );
};

export default AccordionTrigger;
