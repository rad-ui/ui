'use client';

import React, { useContext } from 'react';
import { ComboboxPrimitiveContext } from '../contexts/ComboboxPrimitiveContext';
import Primitive from '../../Primitive';
import Floater from '../../Floater';
import { KEYBOARD_KEYS } from '~/core/utils/keyboard';
import { useComboboxGroupContext } from '../contexts/ComboboxGroupContext';
import { getNodeText, markAsComboboxItemPart } from '../utils/itemLabels';

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
        selectedItemRef,
        hasSearch,
        search,
        hiddenIndices,
        disabledIndices,
        setDisabledIndices,
        labelsRef,
        displayLabelsRef,
        valuesRef,
        bumpLabelsVersion,
        idPrefix
    } = context;
    const itemRef = React.useRef<HTMLButtonElement>(null);
    // Prefer the visible text so the trigger, typeahead, and search all match what users see.
    const itemLabel = label || getNodeText(children).trim() || value;
    const { ref, index } = Floater.useListItem({ label: itemLabel });

    const isHidden = hiddenIndices.includes(index);
    const isActive = activeIndex === index;
    const isSelected = selectedIndex === index || selectedValue === value;

    // Ids are namespaced per root so several comboboxes with the same option values never
    // produce duplicate ids (which would break aria-activedescendant).
    const itemId = `${idPrefix}-option-${value || index}`;

    // With a search field, focus stays in the input (virtual focus), so options are never tab stops.
    const itemTabIndex = disabled || hasSearch ? -1 : isActive ? 0 : -1;

    const groupContext = useComboboxGroupContext();

    // Group registration
    React.useEffect(() => {
        if (groupContext?.registerItem) {
            return groupContext.registerItem(itemId, !isHidden);
        }
    }, [groupContext, itemId, isHidden]);

    // Value and label registration
    React.useEffect(() => {
        valuesRef.current[index] = value;
        labelsRef.current[index] = itemLabel;
        displayLabelsRef.current[index] = itemLabel;
        return () => {
            delete valuesRef.current[index];
            delete labelsRef.current[index];
            delete displayLabelsRef.current[index];
        };
    }, [displayLabelsRef, index, value, itemLabel, labelsRef, valuesRef]);
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
            data-active={isActive}
            aria-selected={isSelected}
            aria-disabled={disabled ? true : undefined}
            data-disabled={disabled ? '' : undefined}
            {...getItemProps({
                tabIndex: itemTabIndex,
                onClick: () => !disabled && handleSelect(index),
                onKeyDown: (event: React.KeyboardEvent) => {
                    if (disabled) return;
                    if (event.key === KEYBOARD_KEYS.ENTER) {
                        event.preventDefault();
                        handleSelect(index);
                    }

                    if (event.key === KEYBOARD_KEYS.SPACE && !isTypingRef.current) {
                        event.preventDefault();
                        handleSelect(index);
                    }
                }
            })}
            {...props}
            tabIndex={itemTabIndex}
        >
            {children}
        </Primitive.div>
    );
});

ComboboxPrimitiveItem.displayName = 'ComboboxPrimitiveItem';
markAsComboboxItemPart(ComboboxPrimitiveItem);

export default ComboboxPrimitiveItem;
