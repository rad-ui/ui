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

    const [isOpen, setIsOpen] = useState(itemValue === activeItem? true : false);
    useEffect(() => {
        if (itemValue === activeItem) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [activeItem]);

    const id = useId();
    let shouldAddFocusDataAttribute = false; // this flag is used to indicate if we should add `data-rad-ui-focus-element` attribute to the accordion item on mount
    const focusItemId = focusItem?.id;

    if (focusItemId === `accordion-data-item-${id}`) {
        shouldAddFocusDataAttribute = true;
    }

    const focusCurrentItem = () => {
        const elem = accordionItemRef?.current;
        // set `data-rad-ui-focus-element` we are making it active and focusing on this item
        if (elem) {
            elem.setAttribute('data-rad-ui-focus-element', '');
        }
    };

    const handleBlurEvent = (e) => {
        // if clicked outside of the accordion, set activeItem to null
        const elem = accordionItemRef?.current;

        // remove `data-rad-ui-focus-element` attribute as we are not focusing on this item anymore
        if (elem) {
            elem.removeAttribute('data-rad-ui-focus-element');
        }
    };

    const handleClickEvent = () => {
        focusCurrentItem();
    };

    const handleFocusEvent = () => {
        focusCurrentItem();
    };


    return (
        <AccordionItemContext.Provider value={{itemValue, setItemValue, handleBlurEvent, handleClickEvent, handleFocusEvent}}>
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
