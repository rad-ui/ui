'use client';
import React, { useRef } from 'react';
import clsx from 'clsx';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
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
    /** When true, every item is non-interactive (Radix Accordion.Root `disabled`). */
    disabled?: boolean;
    asChild?: boolean;
    loop?: boolean;
    disableTabIndexing?: boolean;
    /** @deprecated Prefer `type="multiple"`. */
    openMultiple?: boolean;
    /** Radix-aligned mode: single allows one open section; multiple allows several. */
    type?: 'single' | 'multiple';
    /**
     * When `type` is single (default), whether the open item can be closed by activating its trigger again.
     * Matches Radix: defaults to false (trigger does not collapse the only open item).
     */
    collapsible?: boolean;
    value?: (number | string)[];
    defaultValue?: (number | string)[];
    onValueChange?: (value: (number | string)[]) => void;
};

const AccordionRoot = React.forwardRef<React.ElementRef<'div'>, AccordionRootProps>(({
    children,
    className = '',
    orientation = 'vertical',
    disableTabIndexing = false,
    asChild,
    transitionDuration = 0,
    transitionTimingFunction = 'linear',
    customRootClass,
    disabled: rootDisabled = false,
    loop = true,
    openMultiple = false,
    type,
    collapsible = false,
    value,
    defaultValue = [],
    onValueChange,
    dir,
    ...props
}, forwardedRef) => {
    const accordionRef = useRef<HTMLDivElement | null>(null);
    const componentClass = useComponentClass(customRootClass, COMPONENT_NAME);
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME, 'root');

    const isMultiple = type === 'multiple' || (type !== 'single' && openMultiple);
    const collapsibleEffective = isMultiple ? true : collapsible;

    const processedValue = value !== undefined
        ? (isMultiple ? value : (value.length > 0 ? [value[0]] : []))
        : undefined;

    const processedDefaultValue = isMultiple
        ? defaultValue
        : (defaultValue.length > 0 ? [defaultValue[0]] : []);

    const [activeItems, setActiveItems] = useControllableState<(number | string)[]>(
        processedValue,
    processedDefaultValue,
    onValueChange
    );

    const rovingDir: 'ltr' | 'rtl' = dir === 'rtl' ? 'rtl' : 'ltr';

    return (
        <AccordionContext.Provider
            value={{
                rootClass: componentClass,
                activeItems,
                setActiveItems,
                accordionRef,
                transitionDuration,
                transitionTimingFunction,
                openMultiple: isMultiple,
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
