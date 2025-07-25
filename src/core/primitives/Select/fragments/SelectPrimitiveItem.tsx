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
    
    // Handle missing context gracefully
    if (!context) {
        return (
            <Primitive.div role="option" className={className} {...props}>


                {children}
            </Primitive.div>
        );
    }
    
    const { handleSelect, isTypingRef, getItemProps, activeIndex, selectedIndex, virtualItemRef, selectedItemRef, hasSearch } = context;
    const itemRef = React.useRef<HTMLButtonElement>(null);
    const { ref, index } = Floater.useListItem({ label: value });

    const isActive = activeIndex === index;
    const isSelected = selectedIndex === index;
    
    // Use the value prop for the ID, fallback to index if value is not provided
    const itemId = value || `select-item-${index}`;
    
    // Update virtualItemRef when this item is active
    React.useEffect(() => {
        if (isActive) {
            // Find the current element by ID
            const element = document.getElementById(itemId);
            if (element && virtualItemRef.current !== element) {
                (virtualItemRef as React.MutableRefObject<HTMLElement | null>).current = element;
            }
        }
    }, [isActive, itemId, virtualItemRef]);
    
    React.useEffect(() => {
        if (isSelected) {
           selectedItemRef.current = itemRef.current;
        }
        
    }, [isSelected]);
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
