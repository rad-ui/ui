import React, { useEffect, useState, useId, useRef } from 'react';
import Primitive from '~/core/primitives/Primitive';

import { RovingFocusGroupContext, RovingFocusGroupContextTypes } from '../context/RovingFocusGroupContext';

/**
 * Props for the RovingFocusGroup component
 * @property {React.ReactNode} children - Child components (should include RovingFocusItem components)
 */
type RovingFocusGroupProps = {
    children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Group component for the roving focus pattern
 *
 * Manages the state of focusable items within a group and handles focus tracking.
 * Multiple groups can exist within a single RovingFocusRoot.
 * Each group maintains its own list of focusable items and tracks which item has focus.
 *
 * @example
 * <RovingFocusGroup className="flex gap-2">
 *   <RovingFocusItem><Button>Item 1</Button></RovingFocusItem>
 *   <RovingFocusItem><Button>Item 2</Button></RovingFocusItem>
 * </RovingFocusGroup>
 */
const RovingFocusGroup = ({ children, ...props }: RovingFocusGroupProps) => {
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

    const sendValues: RovingFocusGroupContextTypes = {
        focusedItemId,
        setFocusedItemId,
        focusItems,
        setFocusItems,
        addFocusItem,
        groupRef
    };

    return <RovingFocusGroupContext.Provider value={sendValues}>
        <Primitive.div id={groupId} ref={groupRef} {...props}>
            {children}
        </Primitive.div>
    </RovingFocusGroupContext.Provider>;
};

export default RovingFocusGroup;
