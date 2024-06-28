import React, {useState, useContext, useId} from 'react';

import {AccordionContext} from '../contexts/AccordionContext';
import {AccordionItemContext} from '../contexts/AccordionItemContext';

export type AccordionItemProps = {
    children: React.ReactNode;
    className?: string;
    value?: number;
}

const AccordionItem: React.FC<AccordionItemProps> = ({children, value, className='', ...props}) => {
    const [itemValue, setItemValue] = useState(value);
    const {rootClass} = useContext(AccordionContext);

    const id = useId();

    return (
        <AccordionItemContext.Provider value={{itemValue, setItemValue}}>
            <div
                className={`${rootClass}-item ${className}`} {...props}
                id={`accordion-data-item-${id}`}

            >
                {children}
            </div>
        </AccordionItemContext.Provider>
    );
};

export default AccordionItem;
