'use client';
import { clsx } from 'clsx';
import React, { useContext, useRef } from 'react';
import { AccordionContext } from '../contexts/AccordionContext';
import { AccordionItemContext } from '../contexts/AccordionItemContext';

import CollapsiblePrimitive from '~/core/primitives/Collapsible';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import ButtonPrimitive from '~/core/primitives/Button';

type AccordionTriggerProps = {
  children: React.ReactNode;
  className?: string,
  index?: number,
  handleClick?: (index: number) => void
};

const AccordionTrigger: React.FC<AccordionTriggerProps> = ({ children, index, className = '' }) => {
    const triggerRef = useRef<HTMLButtonElement>(null);
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

    return (
        <RovingFocusGroup.Item>
            <CollapsiblePrimitive.Trigger disabled={disabled} asChild>
                <ButtonPrimitive
                    className={clsx(`${rootClass}-trigger`, className)}
                    ref={triggerRef}
                    aria-disabled={disabled}
                    onClick={onClickHandler}
                    aria-expanded={activeItems.includes(itemValue)}
                    aria-controls={`content-${index}`}
                >
                    {children}
                </ButtonPrimitive>
            </CollapsiblePrimitive.Trigger>
        </RovingFocusGroup.Item>
    );
};

export default AccordionTrigger;
