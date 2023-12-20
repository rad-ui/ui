import React from 'react';
// @ts-ignore
import {customClassSwitcher} from '~/core';

interface AccordionRootProps {
    children: React.ReactNode;
    customRootClass?: string;
}

const AccordionRoot: React.FC<AccordionRootProps> = ({children, customRootClass=''}) => {
    const rootClass = customClassSwitcher(customRootClass, 'Accordion');
    return (
        <span className={`${rootClass}-root`}>
            {children}
        </span>
    );
};

export default AccordionRoot;
