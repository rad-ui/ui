'use client';
import React, { useRef } from 'react';
import { clsx } from 'clsx';
import { customClassSwitcher } from '~/core';
import { AccordionContext } from '../contexts/AccordionContext';
import useControllableState from '~/core/hooks/useControllableState';
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
    disableTabIndexing?: boolean;
    openMultiple?: boolean;
    value?: (number | string)[];
    defaultValue?: (number | string)[];
    onValueChange?: (value: (number | string)[]) => void;
}

const AccordionRoot = ({ children, orientation = 'vertical', disableTabIndexing = true, asChild, transitionDuration = 0, transitionTimingFunction = 'linear', customRootClass, loop = true, openMultiple = false, value, defaultValue = [], onValueChange }: AccordionRootProps) => {
    const accordionRef = useRef<HTMLDivElement | null>(null);
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const processedValue = value !== undefined
        ? (openMultiple ? value : (value.length > 0 ? [value[0]] : []))
        : undefined;

    const processedDefaultValue = openMultiple
        ? defaultValue
        : (defaultValue.length > 0 ? [defaultValue[0]] : []);

    const [activeItems, setActiveItems] = useControllableState<(number | string)[]>(
        processedValue,
    processedDefaultValue,
    onValueChange
    );

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
            <RovingFocusGroup.Root orientation={orientation} loop={loop} disableTabIndexing={disableTabIndexing} >
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
