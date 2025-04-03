'use client';
import { clsx } from 'clsx';
import React, { useContext, useRef } from 'react';
import { AccordionContext } from '../contexts/AccordionContext';
import { AccordionItemContext } from '../contexts/AccordionItemContext';

import CollapsiblePrimitive from '~/core/primitives/Collapsible';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import Primitive from '~/core/primitives/Primitive';

type AccordionTriggerProps = {
  children: React.ReactNode;
  className?: string,
  index?: number,
  activeIndex?: number,
  handleClick?: (index: number) => void
};

const AccordionTrigger: React.FC<AccordionTriggerProps> = ({ children, index, className = '' }) => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const { setActiveItems, rootClass, activeItems, openMultiple } = useContext(AccordionContext);
    const { itemValue, disabled } = useContext(AccordionItemContext);

    const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (openMultiple) {
            // check if the item is already part of the array
            if (activeItems?.includes(itemValue)) {
                setActiveItems(activeItems.filter((item) => item !== itemValue));
            } else {
                setActiveItems([...activeItems, itemValue]);
            }
        } else {
            if (activeItems?.includes(itemValue)) {
                setActiveItems([]);
            } else if (!activeItems?.includes(itemValue)) {
                setActiveItems([itemValue]);
            }
        }
    };

    return (
        <RovingFocusGroup.Item>
            <CollapsiblePrimitive.Trigger disabled={disabled} asChild>
                <Primitive.button
                    className={clsx(`${rootClass}-trigger`, className)}
                    ref={triggerRef}
                    disabled={disabled}
                    onClick={onClickHandler}
                    aria-expanded={activeItems?.includes(itemValue)}
                    aria-controls={`content-${index}`}
                >
                    {children}
                </Primitive.button>
            </CollapsiblePrimitive.Trigger>
        </RovingFocusGroup.Item>

    );
};

export default AccordionTrigger;
