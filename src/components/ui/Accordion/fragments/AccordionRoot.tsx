'use client';
import React, { useState, useRef } from 'react';
import { clsx } from 'clsx';
import { customClassSwitcher } from '~/core';
import { AccordionContext } from '../contexts/AccordionContext';

import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import Primitive from '~/core/primitives/Primitive';

const COMPONENT_NAME = 'Accordion';

export type AccordionRootProps = {
    children: React.ReactNode;
    customRootClass?: string;
    transitionDuration?: number;
    transitionTimingFunction?: string;
    orientation?: 'horizontal' | 'vertical';
    asChild?: boolean;
    loop?: boolean;
    openMultiple?: boolean;
}

const AccordionRoot = ({ children, orientation = 'vertical', asChild, transitionDuration = 0, transitionTimingFunction = 'linear', customRootClass, loop = true, openMultiple = false }: AccordionRootProps) => {
    const accordionRef = useRef<HTMLDivElement | null>(null);
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const [activeItems, setActiveItems] = useState<(number | string)[]>([]);

    return (
        <AccordionContext.Provider
            value={{
                rootClass,
                activeItems,
                setActiveItems,
                accordionRef,
                transitionDuration,
                transitionTimingFunction,
                openMultiple
            }}>
            <RovingFocusGroup.Root orientation={orientation} loop={loop}>
                <RovingFocusGroup.Group >
                    <Primitive.div className={clsx(`${rootClass}-root`)} ref={accordionRef} asChild={asChild}>
                        {children}
                    </Primitive.div>
                </RovingFocusGroup.Group>
            </RovingFocusGroup.Root>
        </AccordionContext.Provider>
    );
};

export default AccordionRoot;
