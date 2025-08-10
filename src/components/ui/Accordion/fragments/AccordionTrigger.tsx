'use client';
import { clsx } from 'clsx';
import React, { useContext, useRef } from 'react';
import { AccordionContext } from '../contexts/AccordionContext';
import { AccordionItemContext } from '../contexts/AccordionItemContext';

import CollapsiblePrimitive from '~/core/primitives/Collapsible';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import ButtonPrimitive from '~/core/primitives/Button';

export type AccordionTriggerProps = {
    children: React.ReactNode;
    className?: string;
    index?: number;
    handleClick?: (index: number) => void;
};

const AccordionTrigger: React.FC<AccordionTriggerProps> = ({
    children,
    index,
    className = ''
}) => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const {
        setActiveItems,
        rootClass,
        activeItems,
        type,
        collapsible,
        disabled: rootDisabled
    } = useContext(AccordionContext);
    const { itemValue, disabled: itemDisabled } = useContext(AccordionItemContext);

    const isDisabled = rootDisabled || itemDisabled;

    const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (isDisabled) return;

        const currentActiveItems = activeItems || [];

        if (type === 'multiple') {
            if (currentActiveItems.includes(itemValue)) {
                const newItems = currentActiveItems.filter((item) => item !== itemValue);
                setActiveItems(newItems);
            } else {
                setActiveItems([...currentActiveItems, itemValue]);
            }
        } else {
            if (currentActiveItems.includes(itemValue)) {
                // Check collapsible constraint
                if (!collapsible) {
                    return;
                }
                setActiveItems([]);
            } else {
                setActiveItems([itemValue]);
            }
        }
    };

    return (
        <RovingFocusGroup.Item>
            <CollapsiblePrimitive.Trigger disabled={isDisabled} asChild>
                <ButtonPrimitive
                    className={clsx(`${rootClass}-trigger`, className)}
                    ref={triggerRef}
                    aria-disabled={isDisabled}
                    onClick={onClickHandler}
                    aria-expanded={activeItems.includes(itemValue)}
                    aria-controls={`content-${index || itemValue}`}
                    data-state={activeItems.includes(itemValue) ? 'open' : 'closed'}
                >
                    {children}
                </ButtonPrimitive>
            </CollapsiblePrimitive.Trigger>
        </RovingFocusGroup.Item>
    );
};

export default AccordionTrigger;
