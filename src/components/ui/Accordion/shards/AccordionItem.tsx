import React from 'react';
// @ts-ignore
import {customClassSwitcher} from '~/core';

const COMPONENT_NAME = 'Accordian';

interface AccordionItemProps {
    children: React.ReactNode;
    customItemClass?: string;
    value?: number;
}

const AccordionItem = ({children, value, customItemClass}: AccordionItemProps) => {
    const rootClass = customClassSwitcher(customItemClass, COMPONENT_NAME)
    return (
        <div className={`${rootClass}-item`}>
            {children}
        </div>
    );
};

export default AccordionItem;
