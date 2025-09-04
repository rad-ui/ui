'use client';
import { clsx } from 'clsx';
import React, { useContext } from 'react';
import { AccordionContext } from '../contexts/AccordionContext';
import { AccordionItemContext } from '../contexts/AccordionItemContext';

import CollapsiblePrimitive from '~/core/primitives/Collapsible';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import ButtonPrimitive from '~/core/primitives/Button';

type AccordionTriggerProps = React.ComponentPropsWithoutRef<'button'> & {
    index?: number;
};

const AccordionTrigger = React.forwardRef<React.ElementRef<'button'>, AccordionTriggerProps>(
    ({ children, index, className = '', onClick, ...props }, ref) => {
    const { setActiveItems, rootClass, activeItems, openMultiple } = useContext(AccordionContext);
    const { itemValue, disabled } = useContext(AccordionItemContext);

    const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        // Create safe array regardless of activeItems state
        const currentActiveItems = activeItems || [];

        if (openMultiple) {
            // check if the item is already part of the array
            if (currentActiveItems.includes(itemValue)) {
                setActiveItems(currentActiveItems.filter((item) => item !== itemValue));
            } else {
                setActiveItems([...currentActiveItems, itemValue]);
            }
        } else {
            if (currentActiveItems.includes(itemValue)) {
                setActiveItems([]);
            } else {
                setActiveItems([itemValue]);
            }
        }
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        onClickHandler(e);
        onClick?.(e);
    };

    return (
        <RovingFocusGroup.Item>
            <CollapsiblePrimitive.Trigger disabled={disabled} asChild>
                <ButtonPrimitive
                    className={clsx(`${rootClass}-trigger`, className)}
                    ref={ref}
                    aria-disabled={disabled}
                    onClick={handleClick}
                    aria-expanded={activeItems.includes(itemValue)}
                    aria-controls={`content-${index}`}
                    {...props}
                >
                    {children}
                </ButtonPrimitive>
            </CollapsiblePrimitive.Trigger>
        </RovingFocusGroup.Item>
    );
});

AccordionTrigger.displayName = 'AccordionTrigger';

export default AccordionTrigger;
