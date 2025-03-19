import React, { useEffect, useState, useId, useRef } from 'react';
import Primitive from '~/core/primitives/Primitive';

import { RovingFocusGroupContext } from '../context/RovingFocusGroupContext';

/**
 * Props for the RovingFocusGroup component
 * @property {React.ReactNode} children - Child components (should include RovingFocusItem components)
 * @property {string} [aria-label] - Accessible label for this specific group
 * @property {string} [aria-labelledby] - ID of an element that labels this specific group
 */
type RovingFocusGroupProps = {
    children: React.ReactNode;
    'aria-label'?: string;
    'aria-labelledby'?: string;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Group component for the roving focus pattern
 *
 * Manages the state of focusable items within a group and handles focus tracking.
 * Multiple groups can exist within a single RovingFocusRoot.
 * Each group maintains its own list of focusable items and tracks which item has focus.
 *
 * @example
 * <RovingFocusGroup className="flex gap-2" aria-label="Navigation section">
 *   <RovingFocusItem><Button>Item 1</Button></RovingFocusItem>
 *   <RovingFocusItem><Button>Item 2</Button></RovingFocusItem>
 * </RovingFocusGroup>
 */
const RovingFocusGroup = ({
    children,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...props
}: RovingFocusGroupProps) => {
    const groupRef = useRef<HTMLDivElement>(null);
    const [focusItems, setFocusItems] = useState<string[]>([]);
    const [focusedItemId, setFocusedItemId] = useState<string | null>(null);
    const groupId = useId();

    /**
     * Adds a new focusable item to the group
     * @param id - Unique identifier for the item
     */
    const addFocusItem = (id: string) => {
        setFocusItems((prev) => [...prev, id]);
    };

    // Set initial focus to the first item when items are added
    useEffect(() => {
        if (!focusedItemId && focusItems.length > 0) {
            setFocusedItemId(focusItems[0]);
        }
    }, [focusItems, focusedItemId]);

    const sendValues = {
        focusedItemId,
        setFocusedItemId,
        focusItems,
        setFocusItems,
        addFocusItem,
        groupRef
    };

    return <RovingFocusGroupContext.Provider value={sendValues}>
        <Primitive.div
            id={groupId}
            ref={groupRef}
            role="group"
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            {...props}
        >
            {children}
        </Primitive.div>
    </RovingFocusGroupContext.Provider>;
};

export default RovingFocusGroup;
