import React, {useState, useContext, useId, useEffect, useRef} from 'react';

import {AccordionContext} from '../contexts/AccordionContext';
import {AccordionItemContext} from '../contexts/AccordionItemContext';

export type AccordionItemProps = {
    children: React.ReactNode;
    className?: string;
    value?: number;
}

const AccordionItem: React.FC<AccordionItemProps> = ({children, value, className='', ...props}) => {
    const accordionItemRef = useRef(null);
    const [itemValue, setItemValue] = useState(value);
    const {rootClass, activeItem, focusItem} = useContext(AccordionContext);

    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        if (itemValue === activeItem) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }
    , [itemValue, activeItem]);
    const id = useId();
    let shouldAddFocusDataAttribute = false;
    const focusItemId = focusItem?.id;

    if (focusItemId === `accordion-data-item-${id}`) {
        console.log('focus item', focusItemId);
        shouldAddFocusDataAttribute = true;
    }

    const handleBlurEvent = () => {
        // if clicked outside of the accordion, set activeItem to null
        const elem = accordionItemRef.current;
        // remove `data-rad-ui-focus-element` attribute as we are not focusing on this item anymore
        elem.removeAttribute('data-rad-ui-focus-element');
    };

    const handleClickEvent = () => {
        // if clicked outside of the accordion, set activeItem to null
        const elem = accordionItemRef.current;
        // remove `data-rad-ui-focus-element` attribute as we are not focusing on this item anymore
        elem.setAttribute('data-rad-ui-focus-element', '');
    };


    return (
        <AccordionItemContext.Provider value={{itemValue, setItemValue, handleBlurEvent, handleClickEvent}}>
            <div
                ref={accordionItemRef}
                className={`${rootClass}-item ${className}`} {...props}
                id={`accordion-data-item-${id}`}
                role="region"
                aria-labelledby={`accordion-trigger-${id}`}
                aria-hidden={!isOpen}
                data-state={isOpen ? 'open' : 'closed'}
                data-rad-ui-batch-element
                {...shouldAddFocusDataAttribute ? {'data-rad-ui-focus-element': ''} : {}}


            >
                {children}
            </div>
        </AccordionItemContext.Provider>
    );
};

export default AccordionItem;
