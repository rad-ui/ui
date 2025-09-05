'use client';
import React, { useRef } from 'react';
import { clsx } from 'clsx';
import { customClassSwitcher } from '~/core';
import { AccordionContext } from '../contexts/AccordionContext';
import useControllableState from '~/core/hooks/useControllableState';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import Primitive from '~/core/primitives/Primitive';

const COMPONENT_NAME = 'Accordion';

export type AccordionRootProps = Omit<React.ComponentPropsWithoutRef<'div'>, 'defaultValue'> & {
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
};

const AccordionRoot = React.forwardRef<React.ElementRef<'div'>, AccordionRootProps>(({
    children,
    orientation = 'vertical',
    disableTabIndexing = true,
    asChild,
    transitionDuration = 0,
    transitionTimingFunction = 'linear',
    customRootClass,
    loop = true,
    openMultiple = false,
    value,
    defaultValue = [],
    onValueChange,
    ...props
}, forwardedRef) => {
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
                    <Primitive.div
                        className={clsx(`${rootClass}-root`)}
                        ref={(node) => {
                            const element = node as HTMLDivElement | null;
                            accordionRef.current = element;
                            if (typeof forwardedRef === 'function') forwardedRef(element);
                            else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = element;
                        }}
                        asChild={asChild}
                        {...props}
                    >
                        {children}
                    </Primitive.div>
                </RovingFocusGroup.Group>
            </RovingFocusGroup.Root>
        </AccordionContext.Provider>
    );
});

AccordionRoot.displayName = COMPONENT_NAME;

export default AccordionRoot;
