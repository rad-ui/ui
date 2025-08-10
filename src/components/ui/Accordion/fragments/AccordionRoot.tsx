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
    type?: 'single' | 'multiple';
    collapsible?: boolean;
    disabled?: boolean;
    dir?: 'ltr' | 'rtl';
    forceMount?: boolean;
    hiddenUntilFound?: boolean;
    // Legacy props (deprecated)
    openMultiple?: boolean;
    keepMounted?: boolean;
    // Value props (updated for Radix UI compatibility)
    value?: string | string[];
    defaultValue?: string | string[];
    onValueChange?: (value: string | string[]) => void;
}

const AccordionRoot = ({
    children,
    orientation = 'vertical',
    disableTabIndexing = true,
    asChild,
    transitionDuration = 0,
    transitionTimingFunction = 'linear',
    customRootClass,
    loop = true,
    type = 'single',
    collapsible = true,
    disabled = false,
    dir = 'ltr',
    forceMount = false,
    hiddenUntilFound = false,
    // Legacy props (deprecated)
    openMultiple,
    keepMounted,
    // Value props
    value,
    defaultValue = [],
    onValueChange
}: AccordionRootProps) => {
    const accordionRef = useRef<HTMLDivElement | null>(null);
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    // Handle legacy props for backward compatibility
    const actualType = openMultiple !== undefined ? (openMultiple ? 'multiple' : 'single') : type;
    const actualForceMount = keepMounted !== undefined ? keepMounted : forceMount;

    // Process values based on type
    const processedValue = value !== undefined
        ? (actualType === 'multiple'
            ? (Array.isArray(value) ? value : [value])
            : (Array.isArray(value) ? (value.length > 0 ? [value[0]] : []) : [value]))
        : undefined;

    const processedDefaultValue = actualType === 'multiple'
        ? (Array.isArray(defaultValue) ? defaultValue : [defaultValue])
        : (Array.isArray(defaultValue) ? (defaultValue.length > 0 ? [defaultValue[0]] : []) : [defaultValue]);

    const [activeItems, setActiveItems] = useControllableState<string[]>(
        processedValue,
        processedDefaultValue,
        onValueChange
    );

    // Handle collapsible logic (only applies to single type)
    const handleValueChange = (newValue: string[]) => {
        if (actualType === 'single' && !collapsible && newValue.length === 0) {
            // Prevent closing all items when collapsible is false
            console.warn('Accordion: Cannot close all items when collapsible is false');
            return;
        }
        setActiveItems(newValue);
    };

    return (
        <AccordionContext.Provider
            value={{
                rootClass,
                activeItems,
                setActiveItems: handleValueChange,
                accordionRef,
                transitionDuration,
                transitionTimingFunction,
                type: actualType,
                collapsible,
                disabled,
                dir,
                forceMount: actualForceMount,
                hiddenUntilFound
            }}>
            <RovingFocusGroup.Root
                orientation={orientation}
                loop={loop}
                disableTabIndexing={disableTabIndexing}
                dir={dir}
            >
                <RovingFocusGroup.Group>
                    <Primitive.div
                        className={clsx(`${rootClass}-root`)}
                        ref={accordionRef}
                        asChild={asChild}
                        dir={dir}
                        data-orientation={orientation}
                        data-type={actualType}
                    >
                        {children}
                    </Primitive.div>
                </RovingFocusGroup.Group>
            </RovingFocusGroup.Root>
        </AccordionContext.Provider>
    );
};

export default AccordionRoot;
