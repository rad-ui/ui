'use client';

import React, { useContext } from 'react';
import { ComboboxPrimitiveContext } from '../contexts/ComboboxPrimitiveContext';
import Primitive from '../../Primitive';
import Floater from '../../Floater';
import { useComboboxGroupContext } from '../contexts/ComboboxGroupContext';

export interface ComboboxPrimitiveItemProps {
    children: React.ReactNode;
    value: string;
    label?: string;
    disabled?: boolean;
    className?: string;
    [key: string]: any;
}

const ComboboxPrimitiveItem = React.forwardRef<
    React.ElementRef<typeof Primitive.div>,
    ComboboxPrimitiveItemProps & React.ComponentPropsWithoutRef<typeof Primitive.div>
>(({ children, value, label, disabled, className, ...props }, forwardedRef) => {
    const context = useContext(ComboboxPrimitiveContext);

    if (!context) {
        console.error('ComboboxPrimitiveItem must be used within a ComboboxPrimitive');
        return null;
    }

    const {
        handleSelect,
        isTypingRef,
        getItemProps,
        activeIndex,
        selectedIndex,
        selectedValue,
        virtualItemRef,
        selectedItemRef,
        hasSearch,
        search,
        hiddenIndices,
        disabledIndices,
        setDisabledIndices,
        labelsRef,
        displayLabelsRef,
        valuesRef,
        bumpLabelsVersion
    } = context;
    const itemRef = React.useRef<HTMLButtonElement>(null);
    const itemLabel = label || value;
    const { ref, index } = Floater.useListItem({ label: itemLabel });

    const isHidden = hiddenIndices.includes(index);
    const isActive = activeIndex === index;
    const isSelected = selectedIndex === index || selectedValue === value;

    // Use the value prop for the ID, fallback to index if value is not provided
    const itemId = value || `select-item-${index}`;

    const groupContext = useComboboxGroupContext();

    // Group registration
    React.useEffect(() => {
        if (groupContext?.registerItem) {
            return groupContext.registerItem(itemId, !isHidden);
        }
    }, [groupContext, itemId, isHidden]);

    // Value and label registration
    React.useEffect(() => {
        valuesRef.current[index] = itemId;
        labelsRef.current[index] = itemLabel;
        displayLabelsRef.current[index] = itemLabel;
        return () => {
            delete valuesRef.current[index];
            delete labelsRef.current[index];
            delete displayLabelsRef.current[index];
        };
    }, [displayLabelsRef, index, itemId, itemLabel, labelsRef, valuesRef]);
    React.useEffect(() => {
        bumpLabelsVersion();
        return () => {
            bumpLabelsVersion();
        };
    }, [index, itemLabel, value, bumpLabelsVersion]);
    // Disabled indices management
    React.useEffect(() => {
        const currentIndex = index;
        setDisabledIndices(prev => {
            if (disabled && prev.includes(currentIndex)) return prev;
            if (!disabled && !prev.includes(currentIndex)) return prev;

            const next = new Set(prev);
            if (disabled) {
                next.add(currentIndex);
            } else {
                next.delete(currentIndex);
            }
            return Array.from(next).sort((a, b) => a - b);
        });

        return () => {
            setDisabledIndices(prev => {
                if (!prev.includes(currentIndex)) return prev;
                const next = new Set(prev);
                next.delete(currentIndex);
                return Array.from(next).sort((a, b) => a - b);
            });
        };
    }, [index, disabled, setDisabledIndices]);

    const setSelectedItemNode = React.useCallback((node: HTMLElement | null) => {
        if (isSelected && !hasSearch) {
            selectedItemRef.current = node;
        } else if (selectedItemRef.current === node) {
            selectedItemRef.current = null;
        }
    }, [hasSearch, isSelected, selectedItemRef]);

    return (
        <Primitive.div
            ref={Floater.useMergeRefs([ref, itemRef, setSelectedItemNode, forwardedRef])}
            id={itemId}
            role="option"
            className={className}
            style={{ display: isHidden ? 'none' : undefined, ...props.style }}
            data-value={value}
            data-label={itemLabel}
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
