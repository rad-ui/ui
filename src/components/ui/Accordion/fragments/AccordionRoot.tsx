import React, { useState, useRef, useEffect } from 'react';
import { clsx } from 'clsx';
import { customClassSwitcher } from '~/core';
import { AccordionContext } from '../contexts/AccordionContext';

import RovingFocusGroup from '~/core/utils/RovingFocusGroup';

const COMPONENT_NAME = 'Accordion';

export type AccordionRootProps = {
    children: React.ReactNode;
    customRootClass?: string;
    transitionDuration?: number;
    direction?: 'horizontal' | 'vertical';
}

const AccordionRoot = ({ children, direction = 'vertical', transitionDuration = 0, customRootClass }: AccordionRootProps) => {
    const accordionRef = useRef<HTMLDivElement | null>(null);
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const [activeItem, setActiveItem] = useState<number | null>(null);

    useEffect(() => {}, []);

    return (
        <AccordionContext.Provider
            value={{
                rootClass,
                activeItem,
                setActiveItem,
                accordionRef,
                transitionDuration
            }}>
            <RovingFocusGroup.Root direction={direction} >
                <RovingFocusGroup.Group className={clsx(`${rootClass}-root`)} ref={accordionRef}>
                    {children}
                </RovingFocusGroup.Group>
            </RovingFocusGroup.Root>
        </AccordionContext.Provider>

    );
};

export default AccordionRoot;
