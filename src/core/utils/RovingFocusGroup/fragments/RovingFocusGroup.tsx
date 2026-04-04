import React, { useEffect, useState, useId, useRef, useContext } from 'react';
import Primitive from '~/core/primitives/Primitive';

import { RovingFocusGroupContext } from '../context/RovingFocusGroupContext';
import { RovingFocusRootContext } from '../context/RovingFocusRootContext';

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
    const { mode } = useContext(RovingFocusRootContext);
    const groupRef = useRef<HTMLDivElement>(null);
    const [focusItems, setFocusItems] = useState<string[]>([]);
    const [focusedItemId, setFocusedItemId] = useState<string | null>(null);
    const groupId = useId();
    
    // Ref registry for direct access to item elements
    const itemRefsMap = useRef(new Map<string, React.RefObject<HTMLElement>>());

    const SHOULD_RECOMPUTE_FOCUS_ITEMS = mode === 'tree';
    
    /**
     * Registers an item's ref in the registry
     * @param id - Unique identifier for the item
     * @param ref - React ref to the item element
     */
    const registerItemRef = React.useCallback((id: string, ref: React.RefObject<HTMLElement>) => {
        itemRefsMap.current.set(id, ref);
    }, []);
    
    /**
     * Unregisters an item's ref from the registry
     * @param id - Unique identifier for the item
     */
    const unregisterItemRef = React.useCallback((id: string) => {
        itemRefsMap.current.delete(id);
    }, []);

    /**
     * Adds a new focusable item to the group
     * @param id - Unique identifier for the item
     */
    const addFocusItem = (id: string) => {
        // For tree mode, recompute items from registered refs instead of DOM queries
        if (SHOULD_RECOMPUTE_FOCUS_ITEMS && typeof window !== 'undefined') {
            // Use the ref registry to get all registered item IDs
            const registeredIds = Array.from(itemRefsMap.current.keys());
            setFocusItems(registeredIds);
            return;
        }
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
        groupRef,
        itemRefs: itemRefsMap.current,
        registerItemRef,
        unregisterItemRef
    };

    return <RovingFocusGroupContext.Provider value={sendValues}>
        <Primitive.div
            id={groupId}
            ref={groupRef}
            role="group"
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            asChild
            {...props}
        >
            {children}
        </Primitive.div>
    </RovingFocusGroupContext.Provider>;
};

export default RovingFocusGroup;
