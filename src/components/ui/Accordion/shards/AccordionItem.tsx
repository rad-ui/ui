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
    const {rootClass, activeItem} = useContext(AccordionContext);

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


    return (
        <AccordionItemContext.Provider value={{itemValue, setItemValue}}>
            <div
                className={`${rootClass}-item ${className}`} {...props}
                id={`accordion-data-item-${id}`}
                role="region"
                aria-labelledby={`accordion-trigger-${id}`}
                aria-hidden={!isOpen}
                data-state={isOpen ? 'open' : 'closed'}

            >
                {children}
            </div>
        </AccordionItemContext.Provider>
    );
};

export default AccordionItem;
