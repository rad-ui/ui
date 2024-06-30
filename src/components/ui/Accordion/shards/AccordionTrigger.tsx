import React, {useContext, useState} from 'react';
import {AccordionContext} from '../contexts/AccordionContext';
import {AccordionItemContext} from '../contexts/AccordionItemContext';
import {getAllBatchElements, getActiveBatchItem, getNextBatchItem, getPrevBatchItem} from '~/core/batches';


type AccordionTriggerProps = {
  children: React.ReactNode;
  className?: string,
  index: number,
  activeIndex: number,
  handleClick: (index: number) => void
};

const AccordionTrigger: React.FC<AccordionTriggerProps> = ({children, index, activeIndex, className=''}) => {
    const {setActiveItem, rootClass, focusNextItem, focusPrevItem, activeItem, setFocusItem, accordionRef} = useContext(AccordionContext);

    const {itemValue} = useContext(AccordionItemContext);


    const onClickHandler = () => {
        setActiveItem(itemValue);

        const batches = getAllBatchElements(accordionRef.current);
        console.log(batches);
        const activeItem = getActiveBatchItem(batches);
        console.log(activeItem);
    };


    return (

        <button
            className={`${rootClass}-trigger ${className}`}
            onKeyDown={(e) => {
                if (e.key === 'ArrowDown') {
                    focusNextItem();
                }
                if (e.key === 'ArrowUp') {
                    focusPrevItem();
                }
            }}
            onClick={onClickHandler}
            aria-expanded={activeItem === itemValue}
            aria-controls={`content-${index}`}
        >
            {children}
        </button>


    );
};

export default AccordionTrigger;
