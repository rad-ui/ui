'use client';

import React, { useContext, useEffect } from 'react';
import { SelectPrimitiveContext } from '../contexts/SelectPrimitiveContext';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import Primitive from '../../Primitive';
import Floater from '../../Floater';

interface SelectPrimitiveItemProps {
    children: React.ReactNode;
    value: string;
    disabled?: boolean
}

function SelectPrimitiveItem({ children, value, disabled, ...props }: SelectPrimitiveItemProps) {
    const { handleSelect, isTypingRef, getItemProps, activeIndex, selectedIndex } = useContext(SelectPrimitiveContext);

    const { ref, index } = Floater.useListItem({ label: value });

    const isActive = activeIndex === index;
    const isSelected = selectedIndex === index;
    return (

        <Primitive.div
            ref={ref}
            role="option"
            aria-selected={isActive && isSelected}
            tabIndex={isActive ? 0 : -1}
            {...getItemProps({
                onClick: () => handleSelect(index),
                onKeyDown: (event: React.KeyboardEvent) => {
                    if (event.key === 'Enter') {
                        event.preventDefault();
                        handleSelect(index);
                    }

                    if (event.key === ' ' && !isTypingRef.current) {
                        event.preventDefault();
                        handleSelect(index);
                    }
                }
            })}
        >
            {children}
        </Primitive.div>

    );
}

export default SelectPrimitiveItem;
