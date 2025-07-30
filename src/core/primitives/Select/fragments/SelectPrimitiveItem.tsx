'use client';

import React, { useContext } from 'react';
import { SelectPrimitiveContext } from '../contexts/SelectPrimitiveContext';
import Primitive from '../../Primitive';
import Floater from '../../Floater';

interface SelectPrimitiveItemProps {
    children: React.ReactNode;
    value: string;
    disabled?: boolean;
    className?: string;
    [key: string]: any;
}

function SelectPrimitiveItem({ children, value, disabled, className, ...props }: SelectPrimitiveItemProps) {
    const context = useContext(SelectPrimitiveContext);

    if (!context) {
        console.error('SelectPrimitiveItem must be used within a SelectPrimitive');
        return null;
    }

    const { handleSelect, isTypingRef, getItemProps, activeIndex, selectedIndex, virtualItemRef, selectedItemRef, hasSearch } = context;
    const itemRef = React.useRef<HTMLButtonElement>(null);
    const { ref, index } = Floater.useListItem({ label: value });

    const isActive = activeIndex === index;
    const isSelected = selectedIndex === index;

    // Use the value prop for the ID, fallback to index if value is not provided
    const itemId = value || `select-item-${index}`;

    React.useEffect(() => {
        if (isSelected && !hasSearch) {
            selectedItemRef.current = itemRef.current;
        }
    }, [isSelected, hasSearch]);

    return (
        <Primitive.div
            ref={Floater.useMergeRefs([ref, itemRef])} // Merge refs from Floater and props.ref}
            id={itemId}
            role="option"
            className={className}
            data-value={value}
            data-active={!hasSearch ? isActive : virtualItemRef.current?.id == itemId }
            aria-selected={isSelected}
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
            {...props}
        >
            {children}
        </Primitive.div>

    );
}

export default SelectPrimitiveItem;
