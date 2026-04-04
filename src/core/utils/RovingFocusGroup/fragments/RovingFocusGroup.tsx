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
        
        // Remove from focusItems to avoid stale IDs
        if (SHOULD_RECOMPUTE_FOCUS_ITEMS) {
            setFocusItems((prev) => prev.filter((itemId) => itemId !== id));
        }
    }, [SHOULD_RECOMPUTE_FOCUS_ITEMS]);

    /**
     * Adds a new focusable item to the group
     * @param id - Unique identifier for the item
     */
    const addFocusItem = React.useCallback((id: string) => {
        // For tree mode, recompute items from registered refs in DOM order
        if (SHOULD_RECOMPUTE_FOCUS_ITEMS && typeof window !== 'undefined') {
            setFocusItems((prevItems) => {
                // Only recompute if the item isn't already in the list
                if (prevItems.includes(id)) {
                    return prevItems;
                }
                
                // Get all registered refs and sort by DOM position
                const entries = Array.from(itemRefsMap.current.entries());
                
                // Filter out refs that don't have a current element
                const validEntries = entries.filter(([, ref]) => ref.current);
                
                // Sort by DOM position using compareDocumentPosition
                validEntries.sort(([, refA], [, refB]) => {
                    const nodeA = refA.current;
                    const nodeB = refB.current;
                    
                    if (!nodeA || !nodeB) return 0;
                    
                    const position = nodeA.compareDocumentPosition(nodeB);
                    
                    // If nodeB comes after nodeA in document order
                    if (position & Node.DOCUMENT_POSITION_FOLLOWING) {
                        return -1;
                    }
                    // If nodeB comes before nodeA in document order
                    if (position & Node.DOCUMENT_POSITION_PRECEDING) {
                        return 1;
                    }
                    
                    return 0;
                });
                
                // Extract IDs in DOM order
                const orderedIds = validEntries.map(([itemId]) => itemId);
                
                // Only update if the order has changed
                if (orderedIds.length === prevItems.length && 
                    orderedIds.every((itemId, index) => itemId === prevItems[index])) {
                    return prevItems;
                }
                
                return orderedIds;
            });
            return;
        }
        setFocusItems((prev) => {
            if (prev.includes(id)) return prev;
            return [...prev, id];
        });
    }, [SHOULD_RECOMPUTE_FOCUS_ITEMS]);

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
