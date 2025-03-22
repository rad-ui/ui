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
                <Primitive.button
                    className={clsx(`${rootClass}-trigger`, className)}
                    ref={triggerRef}
                    onClick={onClickHandler}
                    aria-expanded={activeItem === itemValue}
                    aria-controls={`content-${index}`}
                >
                    {children}
                </Primitive.button>
            </CollapsiblePrimitive.Trigger>
        </RovingFocusGroup.Item>

    );
};

export default AccordionTrigger;
