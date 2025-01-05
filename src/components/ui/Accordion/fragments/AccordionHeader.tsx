import React, { useContext } from 'react';
import { clsx } from 'clsx';
import { AccordionContext } from '../contexts/AccordionContext';
import { AccordionItemContext } from '../contexts/AccordionItemContext';
export type AccordionHeaderProps = {
    children: React.ReactNode;
    className?: string;
}

const AccordionHeader: React.FC<AccordionHeaderProps> = ({ children, className = '' }) => {
    const { setActiveItem, rootClass, focusNextItem, focusPrevItem, activeItem } = useContext(AccordionContext);
    const { itemValue, handleBlurEvent, handleClickEvent, handleFocusEvent } = useContext(AccordionItemContext);

    const expanded = activeItem === itemValue;

    return (
        <div className={clsx(`${rootClass}-header`, className)} data-expanded={expanded}>
            {children}
        </div>
    );
};

export default AccordionHeader;
