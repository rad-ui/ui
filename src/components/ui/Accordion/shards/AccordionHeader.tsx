import React from 'react';
// @ts-ignore
import {customClassSwitcher} from '~/core';

export type AccordionHeaderProps = {
    children: React.ReactNode;
    customHeaderClass?: string;
}

const AccordionHeader: React.FC<AccordionHeaderProps> = ({children, customHeaderClass=''}) => {
    const rootClass = customClassSwitcher(customHeaderClass, 'Accordion');
    return (
        <div className={`${rootClass}-header`}>
            {children}
        </div>
    );
};

export default AccordionHeader;
