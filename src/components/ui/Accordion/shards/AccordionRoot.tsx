import React, {useState, useRef} from 'react';

import {customClassSwitcher} from '~/core';
import {AccordionContext} from '../contexts/AccordionContext';

const COMPONENT_NAME = 'Accordion';

export type AccordionRootProps = {
    children: React.ReactNode;
    customRootClass?: string;
}

const AccordionRoot= ({children, customRootClass}: AccordionRootProps) => {
    const accordionRef = useRef(null);
    const [activeItem, setActiveItem] = useState(null);
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);


    const getActiveItemId = () => {
        const elem = accordionRef.current;
        // get children that have data-state open
        const activeItem = elem.querySelector('[data-state="open"]');

        // get element
        return activeItem;
    };

    const focusNextItem = () => {
        const elem = getActiveItemId();
        const nextElem = elem.nextElementSibling;
        // get button
        const button = nextElem.querySelector('button');
        // focus button
        button?.focus();
    };
    const focusPrevItem = () => {
        const elem = getActiveItemId();
        const prevElem = elem.previousElementSibling;
        // get button
        const button = prevElem.querySelector('button');
        // focus button
        button?.focus();
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
            <div className={`${rootClass}-root`} ref={accordionRef} >
                {children}
            </div>
        </AccordionContext.Provider>

    );
};

export default AccordionRoot;
