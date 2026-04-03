'use client';
import React, { useRef, useEffect, useState } from 'react';
import clsx from 'clsx';
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
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const [fixedHeight, setFixedHeight] = useState<number | null>(null);
    const heightLockTimeoutRef = useRef<NodeJS.Timeout>();
    const previousActiveItemsRef = useRef<(number | string)[]>([]);

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

    // Synchronize animations to maintain constant height during transitions
    // This ensures when one item opens and another closes, the total height remains constant
    // Similar to how Radix-based libraries handle synchronized accordion animations
    useEffect(() => {
        if (transitionDuration === 0 || !accordionRef.current || isMultiple) {
            previousActiveItemsRef.current = [...activeItems];
            return;
        }

        const previousItems = previousActiveItemsRef.current;
        const currentItems = activeItems;

        // Check if items changed (opening/closing)
        const itemsChanged =
            previousItems.length !== currentItems.length ||
            previousItems.some(item => !currentItems.includes(item)) ||
            currentItems.some(item => !previousItems.includes(item));

        if (itemsChanged) {
            // Measure the starting height before transition
            const startHeight = accordionRef.current.offsetHeight;
            setFixedHeight(startHeight);

            // Clear any existing timeout
            if (heightLockTimeoutRef.current) {
                clearTimeout(heightLockTimeoutRef.current);
            }

            // Use RAF to measure target height after DOM updates but before animation completes
            // This allows us to animate the container from start to end height
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    if (accordionRef.current) {
                        // Temporarily unlock to measure the target height
                        setFixedHeight(null);
                        // Force reflow to get accurate measurement
                        const _ = accordionRef.current.offsetHeight;

                        requestAnimationFrame(() => {
                            if (accordionRef.current) {
                                const endHeight = accordionRef.current.offsetHeight;

                                // If heights are different, animate the container
                                // This ensures smooth transition while items animate
                                if (startHeight !== endHeight) {
                                    setFixedHeight(startHeight);
                                    // Animate to end height in next frame
                                    requestAnimationFrame(() => {
                                        setFixedHeight(endHeight);
                                    });
                                }

                                // Release height lock after animation completes
                                heightLockTimeoutRef.current = setTimeout(() => {
                                    setFixedHeight(null);
                                }, transitionDuration);
                            }
                        });
                    }
                });
            });
        }

        previousActiveItemsRef.current = [...currentItems];

        return () => {
            if (heightLockTimeoutRef.current) {
                clearTimeout(heightLockTimeoutRef.current);
            }
        };
    }, [activeItems, transitionDuration, isMultiple]);

    const rovingDir: 'ltr' | 'rtl' = dir === 'rtl' ? 'rtl' : 'ltr';

    return (
        <AccordionContext.Provider
            value={{
                rootClass,
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
                        className={clsx(`${rootClass}-root`)}
                        dir={dir}
                        data-orientation={orientation}
                        ref={(node) => {
                            const element = node as HTMLDivElement | null;
                            accordionRef.current = element;
                            if (typeof forwardedRef === 'function') forwardedRef(element);
                            else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = element;
                        }}
                        style={{
                            ...(fixedHeight !== null && transitionDuration > 0
                                ? {
                                    height: `${fixedHeight}px`,
                                    overflow: 'hidden',
                                    transition: `height ${transitionDuration}ms ${transitionTimingFunction}`
                                }
                                : {}),
                            ...(props.style || {})
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
