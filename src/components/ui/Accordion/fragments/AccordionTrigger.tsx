import { clsx } from 'clsx';
import React, { useContext, useRef } from 'react';
import { AccordionContext } from '../contexts/AccordionContext';
import { AccordionItemContext } from '../contexts/AccordionItemContext';

import CollapsiblePrimitive from '~/core/primitives/Collapsible';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';

type AccordionTriggerProps = {
  children: React.ReactNode;
  className?: string,
  index?: number,
  activeIndex?: number,
  handleClick?: (index: number) => void
};

const AccordionTrigger: React.FC<AccordionTriggerProps> = ({ children, index, className = '' }) => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const { setActiveItem, rootClass, activeItem } = useContext(AccordionContext);
    const { itemValue } = useContext(AccordionItemContext);

    const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (activeItem === itemValue) {
            setActiveItem(null);
        } else if (activeItem !== itemValue) {
            setActiveItem(itemValue);
        }
    };

    return (
        <RovingFocusGroup.Item>
            <CollapsiblePrimitive.Trigger asChild>
                <button
                    type="button"
                    className={clsx(`${rootClass}-trigger`, className)}
                    ref={triggerRef}
                    onClick={onClickHandler}
                    aria-expanded={activeItem === itemValue}
                    aria-controls={`content-${index}`}
                >
                    {children}
                </button>
            </CollapsiblePrimitive.Trigger>
        </RovingFocusGroup.Item>

    );
};

export default AccordionTrigger;
