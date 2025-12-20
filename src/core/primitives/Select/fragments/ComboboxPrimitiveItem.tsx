'use client';

import React, { useContext } from 'react';
import { ComboboxPrimitiveContext } from '../contexts/ComboboxPrimitiveContext';
import Primitive from '../../Primitive';
import Floater from '../../Floater';

export interface ComboboxPrimitiveItemProps {
    children: React.ReactNode;
    value: string;
    disabled?: boolean;
    className?: string;
    [key: string]: any;
}

const ComboboxPrimitiveItem = React.forwardRef<
    React.ElementRef<typeof Primitive.div>,
    ComboboxPrimitiveItemProps & React.ComponentPropsWithoutRef<typeof Primitive.div>
>(({ children, value, disabled, className, ...props }, forwardedRef) => {
    const context = useContext(ComboboxPrimitiveContext);

    if (!context) {
        console.error('ComboboxPrimitiveItem must be used within a ComboboxPrimitive');
        return null;
    }

    const { handleSelect, isTypingRef, getItemProps, activeIndex, selectedIndex, virtualItemRef, selectedItemRef, hasSearch, disabledIndices, setDisabledIndices, valuesRef } = context;
    const itemRef = React.useRef<HTMLButtonElement>(null);
    const { ref, index } = Floater.useListItem({ label: value });
    const prevIndexRef = React.useRef(index);

    const isActive = activeIndex === index;
    const isSelected = selectedIndex === index;

    // Use the value prop for the ID, fallback to index if value is not provided
    const itemId = value || `select-item-${index}`;

    React.useEffect(() => {
        const prevIndex = prevIndexRef.current;

        valuesRef.current[index] = itemId;
        if (prevIndex !== index) {
            delete valuesRef.current[prevIndex];
        }

        setDisabledIndices(prev => {
            const next = new Set(prev);
            next.delete(prevIndex);
            if (disabled) {
                next.add(index);
            } else {
                next.delete(index);
            }
            return Array.from(next).sort((a, b) => a - b);
        });

        if (isSelected && !hasSearch) {
            selectedItemRef.current = itemRef.current;
        }

        prevIndexRef.current = index;

        return () => {
            setDisabledIndices(prev => {
                const next = new Set(prev);
                next.delete(prevIndexRef.current);
                return Array.from(next).sort((a, b) => a - b);
            });
        };
    }, [index, disabled, isSelected, hasSearch, setDisabledIndices, selectedItemRef, valuesRef]);

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
            {...getItemProps({
                tabIndex: disabled ? -1 : isActive ? 0 : -1,
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
            tabIndex={disabled ? -1 : isActive ? 0 : -1}
        >
            {children}
        </Primitive.div>

    );
});

ComboboxPrimitiveItem.displayName = 'ComboboxPrimitiveItem';

export default ComboboxPrimitiveItem;
