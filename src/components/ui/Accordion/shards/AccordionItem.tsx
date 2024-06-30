import React, {useState, useContext, useId, useEffect} from 'react';

import {AccordionContext} from '../contexts/AccordionContext';
import {AccordionItemContext} from '../contexts/AccordionItemContext';

export type AccordionItemProps = {
    children: React.ReactNode;
    className?: string;
    value?: number;
}

const AccordionItem: React.FC<AccordionItemProps> = ({children, value, className='', ...props}) => {
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


    return (
        <AccordionItemContext.Provider value={{itemValue, setItemValue}}>
            <div
                className={`${rootClass}-item ${className}`} {...props}
                id={`accordion-data-item-${id}`}
                role="region"
                aria-labelledby={`accordion-trigger-${id}`}
                aria-hidden={!isOpen}
                data-state={isOpen ? 'open' : 'closed'}
                data-rad-ui-batch-element
                // need to add `data-rad-ui-focus-element` when itemValue === activeItem
                // we set it here

                {...shouldAddFocusDataAttribute ? {'data-rad-ui-focus-element': ''} : {}}


            >
                {children}
            </div>
        </AccordionItemContext.Provider>
    );
};

export default AccordionItem;
