import React, { forwardRef, useContext, useEffect, useId, useRef } from 'react';

import Primitive from '~/core/primitives/Primitive';

import { RovingFocusGroupContext } from '../context/RovingFocusGroupContext';
import { RovingFocusRootContext } from '../context/RovingFocusRootContext';

/**
 * Props for the RovingFocusItem component
 * @property {React.ReactNode} children - Child component that will receive focus (usually a button or other interactive element)
 */
type RovingFocusItemProps = {
    children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Individual focusable item in a roving focus group
 *
 * Handles keyboard navigation between items and manages focus states.
 * Uses the tabindex attribute to control which item is focusable.
 * Only one item in a group will have tabIndex={0} at a time.
 *
 * @example
 * <RovingFocusItem>
 *   <Button>Focusable Item</Button>
 * </RovingFocusItem>
 */
const RovingFocusItem = forwardRef<HTMLButtonElement, RovingFocusItemProps>(({ children, ...props }, ref) => {
    const id = useId();
    const { focusedItemId, setFocusedItemId, addFocusItem, focusItems, groupRef } = useContext(RovingFocusGroupContext);
    const { direction, loop } = useContext(RovingFocusRootContext);

    // Register this item with the parent group
    useEffect(() => {
        // we check if the item is in the focusItems array, if not we add it
        if (!focusItems.includes(id)) {
            addFocusItem(id);
        }

        //

        //
    }, [focusItems, focusedItemId]);

    /**
     * Focuses an item by its ID
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
     * Focuses the previous item in the group
     * If at the first item and loop=true, will focus the last item
     */
    const focusPreviousItem = () => {
        const previousIndex = focusItems.indexOf(id) - 1;
        if (previousIndex >= 0) {
            focusItemWithId(focusItems[previousIndex]);
        } else if (loop) {
            // If we're at the first item and loop is enabled, go to the last item
            focusItemWithId(focusItems[focusItems.length - 1]);
        }
    };

    /**
     * Focuses the next item in the group
     * If at the last item and loop=true, will focus the first item
     */
    const focusNextItem = () => {
        const nextIndex = focusItems.indexOf(id) + 1;
        if (nextIndex < focusItems.length) {
            focusItemWithId(focusItems[nextIndex]);
        } else if (loop) {
            // If we're at the last item and loop is enabled, go to the first item
            focusItemWithId(focusItems[0]);
        }
    };

    /**
     * Handles keyboard navigation between items
     * Prevents default scrolling behavior for arrow keys
     */
    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        // Always prevent default for arrow keys to stop scrolling
        switch (event.key) {
        case 'ArrowUp':
            event.preventDefault();
            if (direction === 'vertical') {
                focusPreviousItem();
            }
            break;

        case 'ArrowLeft':
            event.preventDefault();
            if (direction === 'horizontal') {
                focusPreviousItem();
            }
            break;

        case 'ArrowDown':
            event.preventDefault();
            if (direction === 'vertical') {
                focusNextItem();
            }
            break;

        case 'ArrowRight':
            event.preventDefault();
            if (direction === 'horizontal') {
                focusNextItem();
            }
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
        setFocusedItemId(id);
    };

    return <Primitive.button
        asChild
        onFocus={handleFocus}
        tabIndex={focusedItemId === id ? 0 : -1}
        ref={ref}
        id={id}
        onKeyDown={handleKeyDown}
        {...props}
    >
        {children}
    </Primitive.button>;
});

RovingFocusItem.displayName = 'RovingFocusItem';

export default RovingFocusItem;
