import React, {useContext} from 'react';
import {AccordionContext} from '../contexts/AccordionContext';
import {AccordionItemContext} from '../contexts/AccordionItemContext';


type AccordionTriggerProps = {
  children: React.ReactNode;
  className?: string,
  index: number,
  activeIndex: number,
  handleClick: (index: number) => void
};

const AccordionTrigger: React.FC<AccordionTriggerProps> = ({children, index, activeIndex, className=''}) => {
    const {setActiveItem, rootClass, focusNextItem, focusPrevItem, activeItem} = useContext(AccordionContext);

    const {itemValue, handleBlurEvent, handleClickEvent} = useContext(AccordionItemContext);


    const onClickHandler = () => {
        setActiveItem(itemValue);
        handleClickEvent();
    };


    return (

        <button
            className={`${rootClass}-trigger ${className}`}
            onBlur={handleBlurEvent}
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
