import React, { useContext } from 'react';
import { AccordionContext } from '../contexts/AccordionContext';
import { AccordionItemContext } from '../contexts/AccordionItemContext';
import { clsx } from 'clsx';

type AccordionTriggerProps = {
  children: React.ReactNode;
  className?: string,
};

const AccordionTrigger: React.FC<AccordionTriggerProps> = ({ children, className = '' }) => {
    const { setActiveItem, rootClass, focusNextItem, focusPrevItem, activeItem } = useContext(AccordionContext);
    const { itemValue, handleBlurEvent, handleClickEvent, handleFocusEvent } = useContext(AccordionItemContext);

    const onClickHandler = () => {
        if (activeItem === itemValue) {
            setActiveItem(null);
        } else if (activeItem !== itemValue) {
            setActiveItem(itemValue);
            handleClickEvent();
        }
    };

    const onFocusHandler = () => {
        handleFocusEvent();
    };

    return (

        <button
            type="button"
            className={clsx(`${rootClass}-trigger`, className)}
            onBlur={handleBlurEvent}
            onFocus={onFocusHandler}
            onKeyDown={(e) => {
                if (e.key === 'ArrowDown') {
                    // prevent scrolling when pressing arrow keys
                    e.preventDefault();
                    focusNextItem();
                }
                if (e.key === 'ArrowUp') {
                    // prevent scrolling when pressing arrow keys
                    e.preventDefault();
                    focusPrevItem();
                }
            }}
            onClick={onClickHandler}
            aria-expanded={activeItem === itemValue}
            aria-controls={`content-${itemValue}`}
        >
            {children}
        </button>

    );
};

export default AccordionTrigger;
