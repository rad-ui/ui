import React, {useState} from 'react';

import {customClassSwitcher} from '~/core';
import {AccordionContext} from '../contexts/AccordionContext';

const COMPONENT_NAME = 'Accordion';

export type AccordionRootProps = {
    children: React.ReactNode;
    customRootClass?: string;
}

const AccordionRoot= ({children, customRootClass}: AccordionRootProps) => {
    const [activeItem, setActiveItem] = useState(0);
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const focusNextItem = (index) => {
        console.log(activeItem);
        console.log('focusNextItem');
    };
    const focusPrevItem = (index) => {
        console.log('focusPrevItem');
    };

    return (
        <AccordionContext.Provider
            value={{
                rootClass: rootClass,
                activeItem,
                setActiveItem,
                focusNextItem,
                focusPrevItem,

            }}>
            <div className={`${rootClass}-root`}>
                {children}
            </div>
        </AccordionContext.Provider>

    );
};

export default AccordionRoot;
