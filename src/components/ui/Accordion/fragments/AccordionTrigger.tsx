import React, { useContext } from 'react';
import { AccordionContext } from '../contexts/AccordionContext';
import { AccordionItemContext } from '../contexts/AccordionItemContext';
import { clsx } from 'clsx';

type AccordionTriggerProps = {
  children: React.ReactNode;
  className?: string,
  index: number,
  activeIndex: number,
  handleClick: (index: number) => void
};

const AccordionTrigger: React.FC<AccordionTriggerProps> = ({ children, index, className = '' }) => {
    const { setActiveItem, rootClass, focusNextItem, focusPrevItem, activeItem } = useContext(AccordionContext);
    const { itemValue, handleBlurEvent, handleClickEvent, handleFocusEvent } = useContext(AccordionItemContext);

    const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (activeItem === itemValue) {
            setActiveItem(null);
        } else if (activeItem !== itemValue) {
            setActiveItem(itemValue);
            handleClickEvent(e);
        }
    };

    const onFocusHandler = (e: React.FocusEvent<HTMLButtonElement>) => {
        handleFocusEvent(e);
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
            aria-controls={`content-${index}`}
        >
            {children}
        </button>

    );
};

export default AccordionTrigger;
