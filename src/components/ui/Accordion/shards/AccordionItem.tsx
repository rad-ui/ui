import React, {useContext} from 'react';

import {AccordionContext} from '../contexts/AccordionContext';

export type AccordionItemProps = {
    children: React.ReactNode;
    className?: string;
    value?: number;
}

const AccordionItem: React.FC<AccordionItemProps> = ({children, value, className='', ...props}) => {
    const {activeItem, rootClass} = useContext(AccordionContext);


    return (
        <div className={`${rootClass}-item ${className}`} {...props}>
            {children}
        </div>
    );
};

export default AccordionItem;
