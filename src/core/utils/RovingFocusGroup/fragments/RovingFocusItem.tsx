import React, { forwardRef, useContext, useEffect, useId, useRef } from 'react';

import Primitive from '~/core/primitives/Primitive';

import { RovingFocusGroupContext } from '../context/RovingFocusGroupContext';
import { RovingFocusRootContext } from '../context/RovingFocusRootContext';

/**
 * Props for the RovingFocusItem component
 * @property {React.ReactNode} children - Child component that will receive focus (usually a button or other interactive element)
 * @property {string} [aria-label] - Accessible label for this item
 * @property {string} [aria-labelledby] - ID of an element that labels this item
 */
type RovingFocusItemProps = {
    children: React.ReactNode;
    'aria-label'?: string;
    'aria-labelledby'?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Individual focusable item in a roving focus group
 *
 * Handles keyboard navigation between items and manages focus states.
 * Uses the tabindex attribute to control which item is focusable.
 * Only one item in a group will have tabIndex={0} at a time.
 * Automatically respects the disabled state of child elements.
 *
 * @example
 * <RovingFocusItem aria-label="Navigation option">
 *   <Button>Focusable Item</Button>
 * </RovingFocusItem>
 *
 * <RovingFocusItem>
 *   <Button disabled>Disabled Item (skipped during navigation)</Button>
 * </RovingFocusItem>
 */
const RovingFocusItem = forwardRef<HTMLButtonElement, RovingFocusItemProps>(({
    children,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...props
}, ref) => {
    const id = useId();
    const { focusedItemId, setFocusedItemId, addFocusItem, focusItems, groupRef } = useContext(RovingFocusGroupContext);
    const { orientation, loop } = useContext(RovingFocusRootContext);

    // Check if the child element is disabled
    const childrenArray = React.Children.toArray(children);
    const child = childrenArray[0] as React.ReactElement;
    const isDisabled = child?.props?.disabled === true;

    // Is this item currently selected
    const isSelected = focusedItemId === id;

    // Register this item with the parent group
    useEffect(() => {
        // we check if the item is in the focusItems array, if not we add it
        if (!focusItems.includes(id)) {
            addFocusItem(id);
        }
    }, [focusItems, focusedItemId, id, addFocusItem]);

    /**
     * Focuses an item by its ID, skipping disabled items
     * @param id - ID of the item to focus
     */
    const focusItemWithId = (id: string) => {
        if (groupRef && groupRef.current) {
            setFocusedItemId(id);
            // Sanitize the id to ensure it's a valid CSS selector
            const sanitizedId = CSS.escape(id);
            const item = groupRef.current.querySelector(`#${sanitizedId}`);
            if (item) {
                (item as HTMLElement).focus();
            }
        }
    };

    /**
     * Finds the next enabled item index from a starting position
     * @param startIndex - Index to start searching from
     * @param step - orientation to move (-1 for previous, 1 for next)
     * @returns Index of the next enabled item, or -1 if none found
     */
    const findEnabledItemIndex = (startIndex: number, step: number): number => {
        let currentIndex = startIndex;

        // Loop at most once through all items to avoid infinite loops
        for (let i = 0; i < focusItems.length; i++) {
            currentIndex = currentIndex + step;

            // Handle wrapping when loop is enabled
            if (loop) {
                if (currentIndex < 0) currentIndex = focusItems.length - 1;
                if (currentIndex >= focusItems.length) currentIndex = 0;
            } else {
                // Stop if we've reached the end
                if (currentIndex < 0 || currentIndex >= focusItems.length) {
                    return -1;
                }
            }

            // Check if this item is enabled by finding the element and checking for disabled children
            const itemId = focusItems[currentIndex];
            const itemElement = groupRef?.current?.querySelector(`#${CSS.escape(itemId)}`) as HTMLElement;
            if (!itemElement) continue;

            // Check the data attribute that we set to indicate if child is disabled
            const childIsDisabled = itemElement.getAttribute('data-child-disabled') === 'true';

            if (!childIsDisabled) {
                return currentIndex;
            }
        }

        return -1; // No enabled items found
    };

    /**
     * Focuses the previous enabled item in the group
     * If at the first item and loop=true, will focus the last enabled item
     */
    const focusPreviousItem = () => {
        const currentIndex = focusItems.indexOf(id);
        const previousEnabledIndex = findEnabledItemIndex(currentIndex, -1);

        if (previousEnabledIndex !== -1) {
            focusItemWithId(focusItems[previousEnabledIndex]);
        }
    };

    /**
     * Focuses the next enabled item in the group
     * If at the last item and loop=true, will focus the first enabled item
     */
    const focusNextItem = () => {
        const currentIndex = focusItems.indexOf(id);
        const nextEnabledIndex = findEnabledItemIndex(currentIndex, 1);

        if (nextEnabledIndex !== -1) {
            focusItemWithId(focusItems[nextEnabledIndex]);
        }
    };

    /**
     * Focuses the first enabled item in the group
     */
    const focusFirstItem = () => {
        if (focusItems.length > 0) {
            // Find first enabled item
            const firstEnabledIndex = findEnabledItemIndex(-1, 1);
            if (firstEnabledIndex !== -1) {
                focusItemWithId(focusItems[firstEnabledIndex]);
            }
        }
    };

    /**
     * Focuses the last enabled item in the group
     */
    const focusLastItem = () => {
        if (focusItems.length > 0) {
            // Find last enabled item
            const lastEnabledIndex = findEnabledItemIndex(focusItems.length, -1);
            if (lastEnabledIndex !== -1) {
                focusItemWithId(focusItems[lastEnabledIndex]);
            }
        }
    };

    /**
     * Handles keyboard navigation between items
     * Prevents default scrolling behavior for arrow keys
     */
    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        // Don't handle navigation if this item has a disabled child
        if (isDisabled) return;

        // Always prevent default for arrow keys to stop scrolling
        switch (event.key) {
        case 'ArrowUp':
            event.preventDefault();
            if (orientation === 'vertical') {
                focusPreviousItem();
            }
            break;

        case 'ArrowLeft':
            event.preventDefault();
            if (orientation === 'horizontal') {
                focusPreviousItem();
            }
            break;

        case 'ArrowDown':
            event.preventDefault();
            if (orientation === 'vertical') {
                focusNextItem();
            }
            break;

        case 'ArrowRight':
            event.preventDefault();
            if (orientation === 'horizontal') {
                focusNextItem();
            }
            break;

        case 'Home':
            event.preventDefault();
            focusFirstItem();
            break;

        case 'End':
            event.preventDefault();
            focusLastItem();
            break;

        case 'Tab':
            // Tab key is handled by the browser for normal tab navigation
            break;

        default:
            break;
        }
    };

    /**
     * Updates focus state when this item receives focus
     */
    const handleFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (!isDisabled) {
            setFocusedItemId(id);
        }
    };

    return <Primitive.button
        asChild
        onFocus={handleFocus}
        tabIndex={!isDisabled && isSelected ? 0 : -1}
        ref={ref}
        id={id}
        onKeyDown={handleKeyDown}
        data-child-disabled={isDisabled}
        role="option"
        aria-selected={isSelected}
        aria-disabled={isDisabled}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        {...props}
    >
        {children}
    </Primitive.button>;
});

RovingFocusItem.displayName = 'RovingFocusItem';

export default RovingFocusItem;
