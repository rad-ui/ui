import React, { forwardRef, useContext, useEffect, useId, useRef } from 'react';

import Primitive from '~/core/primitives/Primitive';

import { RovingFocusGroupContext } from '../context/RovingFocuGroupContext';

const RovingFocusItem = forwardRef<HTMLButtonElement, { children: React.ReactNode }>(({ children, ...props }, ref) => {
    const id = useId();
    const { focusedItemId, setFocusedItemId, addFocusItem, focusItems, groupRef } = useContext(RovingFocusGroupContext);

    useEffect(() => {
        // we check if the item is in the focusItems array, if not we add it
        if (!focusItems.includes(id)) {
            addFocusItem(id);
        }

        if (focusedItemId === id) {
            console.log('focusedItemId', focusedItemId);
            console.log('groupRef', groupRef);
            if (groupRef.current) {
                console.log('groupRef.current', groupRef.current);
                // Sanitize the id to ensure it's a valid CSS selector
                const sanitizedId = CSS.escape(id);
                const item = groupRef?.current?.querySelector(`#${sanitizedId}`);
                if (item) {
                    item.focus();
                }
            }
        }
    }, [focusItems, focusedItemId]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        switch (event.key) {
        case 'ArrowUp':
        case 'ArrowLeft':
            // Logic to move focus to the previous item
            setFocusedItemId(focusItems[focusItems.indexOf(id) - 1]);

            break;
        case 'ArrowDown':
        case 'ArrowRight':
            // Logic to move focus to the next item
            setFocusedItemId(focusItems[focusItems.indexOf(id) + 1]);

            break;
        case 'Tab':
            // Logic to handle tab key if needed
            console.log('Tab');
            break;
        default:
            break;
        }
    };

    const handleFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setFocusedItemId(id);
    };

    return <Primitive.button asChild onFocus={handleFocus} tabIndex={focusedItemId === id ? 0 : -1} ref={ref} id={id} onKeyDown={handleKeyDown} {...props}>
        {children}
    </Primitive.button>;
});

RovingFocusItem.displayName = 'RovingFocusItem';

export default RovingFocusItem;
