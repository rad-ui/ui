import React from 'react';
// @ts-ignore
import {customClassSwitcher} from '~/core';

interface AccordionRootProps {
    children: React.ReactNode;
    customRootClass?: string;
}

const AccordionRoot= ({children, customRootClass}: AccordionRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, 'Accordion');
    return (
        <span className={`${rootClass}-root`}>
            {children}
        </span>
    );
};

export default AccordionRoot;
