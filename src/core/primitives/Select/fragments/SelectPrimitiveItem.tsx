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

const SelectPrimitiveItem = React.forwardRef<
    React.ElementRef<typeof Primitive.div>,
    SelectPrimitiveItemProps & React.ComponentPropsWithoutRef<typeof Primitive.div>
>(({ children, value, disabled, className, ...props }, forwardedRef) => {
    const context = useContext(SelectPrimitiveContext);

    if (!context) {
        console.error('SelectPrimitiveItem must be used within a SelectPrimitive');
        return null;
    }

    const { handleSelect, isTypingRef, getItemProps, activeIndex, selectedIndex, virtualItemRef, selectedItemRef, hasSearch, disabledIndices, setDisabledIndices, valuesRef } = context;
    const itemRef = React.useRef<HTMLButtonElement>(null);
    const { ref, index } = Floater.useListItem({ label: value });

    const isActive = activeIndex === index;
    const isSelected = selectedIndex === index;

    // Use the value prop for the ID, fallback to index if value is not provided
    const itemId = value || `select-item-${index}`;

    React.useEffect(() => {
        valuesRef.current[index] = itemId;
        setDisabledIndices(prev => {
            const next = new Set(prev);
            if (disabled) {
                next.add(index);
            } else {
                next.delete(index);
            }
            return Array.from(next).sort((a,b)=>a-b);
        });
        if (isSelected && !hasSearch) {
            selectedItemRef.current = itemRef.current;
        }
    }, [index, disabled, isSelected, hasSearch, setDisabledIndices]);

    return (
        <Primitive.div
            ref={Floater.useMergeRefs([ref, itemRef, forwardedRef])}
            id={itemId}
            role="option"
            className={className}
            data-value={value}
            data-label={value}
            data-active={!hasSearch ? isActive : virtualItemRef.current?.id == itemId }
            aria-selected={isSelected}
            aria-disabled={disabled ? true : undefined}
            data-disabled={disabled ? '' : undefined}
            tabIndex={isActive ? 0 : -1}
            {...getItemProps({
                onClick: () => !disabled && handleSelect(index),
                onKeyDown: (event: React.KeyboardEvent) => {
                    if (disabled) return;
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
});

SelectPrimitiveItem.displayName = 'SelectPrimitiveItem';

export default SelectPrimitiveItem;
