'use client';
import React, { useRef } from 'react';
import clsx from 'clsx';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import { AccordionContext } from '../contexts/AccordionContext';
import useControllableState from '~/core/hooks/useControllableState';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import Primitive from '~/core/primitives/Primitive';

const COMPONENT_NAME = 'Accordion';

export type AccordionItemValue = string;

type AccordionRootSharedProps = Omit<React.ComponentPropsWithoutRef<'div'>, 'defaultValue'> & {
    customRootClass?: string;
    orientation?: 'horizontal' | 'vertical';
    /** When true, every item is non-interactive (Radix Accordion.Root `disabled`). */
    disabled?: boolean;
    asChild?: boolean;
    loop?: boolean;
    disableTabIndexing?: boolean;
    /** @deprecated Prefer `type="multiple"` to match the Radix Accordion API. */
    openMultiple?: boolean;
};

type AccordionRootSingleProps = {
    type?: 'single';
    /**
     * When `type` is single (default), whether the open item can be closed by activating its trigger again.
     * Matches Radix: defaults to false (trigger does not collapse the only open item).
     */
    collapsible?: boolean;
    value?: AccordionItemValue;
    defaultValue?: AccordionItemValue;
    onValueChange?: (value: AccordionItemValue | undefined) => void;
};

type AccordionRootMultipleProps = {
    type: 'multiple';
    value?: AccordionItemValue[];
    defaultValue?: AccordionItemValue[];
    onValueChange?: (value: AccordionItemValue[]) => void;
    collapsible?: boolean;
};

export type AccordionRootProps = AccordionRootSharedProps & (
    AccordionRootSingleProps |
    AccordionRootMultipleProps
);

const AccordionRoot = React.forwardRef<React.ElementRef<'div'>, AccordionRootProps>((props, forwardedRef) => {
    const {
        children,
        className = '',
        orientation = 'vertical',
        disableTabIndexing = true,
        asChild,
        customRootClass,
        disabled: rootDisabled = false,
        loop = true,
        collapsible = false,
        type,
        value,
        defaultValue,
        onValueChange,
        openMultiple = false,
        dir,
        ...restProps
    } = props;
    const accordionRef = useRef<HTMLDivElement | null>(null);
    const componentClass = useComponentClass(customRootClass, COMPONENT_NAME);
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME, 'root');

    const isMultiple = type === 'multiple' || openMultiple;
    const collapsibleEffective = isMultiple ? true : collapsible;
    const rawValue = value as AccordionItemValue | AccordionItemValue[] | undefined;
    const rawDefaultValue = defaultValue as AccordionItemValue | AccordionItemValue[] | undefined;

    const processedValue = rawValue === undefined
        ? undefined
        : (Array.isArray(rawValue) ? rawValue : [rawValue]);

    const processedDefaultValue = rawDefaultValue === undefined
        ? []
        : (Array.isArray(rawDefaultValue) ? rawDefaultValue : [rawDefaultValue]);

    const handleValueChange = (nextValue: AccordionItemValue[]) => {
        if (isMultiple) {
            (onValueChange as AccordionRootMultipleProps['onValueChange'])?.(nextValue);
            return;
        }

        (onValueChange as AccordionRootSingleProps['onValueChange'])?.(nextValue[0]);
    };

    const [activeItems, setActiveItems] = useControllableState<AccordionItemValue[]>(
        processedValue,
        processedDefaultValue,
        handleValueChange
    );

    const rovingDir: 'ltr' | 'rtl' = dir === 'rtl' ? 'rtl' : 'ltr';

    return (
        <AccordionContext.Provider
            value={{
                rootClass: componentClass,
                activeItems,
                setActiveItems,
                accordionRef,
                multiple: isMultiple,
                collapsible: collapsibleEffective,
                disabled: rootDisabled,
                orientation
            }}>
            <RovingFocusGroup.Root
                orientation={orientation}
                loop={loop}
                disableTabIndexing={disableTabIndexing}
                dir={rovingDir}
            >
                <RovingFocusGroup.Group >
                    <Primitive.div
                        className={clsx(rootClass, className)}
                        dir={dir}
                        data-orientation={orientation}
                        ref={(node) => {
                            const element = node as HTMLDivElement | null;
                            accordionRef.current = element;
                            if (typeof forwardedRef === 'function') forwardedRef(element);
                            else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = element;
                        }}
                        asChild={asChild}
                        {...restProps}
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
