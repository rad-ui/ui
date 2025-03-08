import React, { forwardRef, useContext, useEffect, useId, useRef } from 'react';

import Primitive from '~/core/primitives/Primitive';

import { RovingFocusGroupContext } from '../context/RovingFocuGroupContext';

const RovingFocusItem = forwardRef<HTMLButtonElement, { children: React.ReactNode }>(({ children, ...props }, ref) => {
    const id = useId();
    const { focusedItemId, setFocusedItemId, addFocusItem, focusItems, groupRef, direction, loop } = useContext(RovingFocusGroupContext);

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
        case 'ArrowUp': {
            if (direction === 'vertical') {
                // Logic to move focus to the previous item
                const previousIndex = focusItems.indexOf(id) - 1;
                if (previousIndex >= 0) {
                    setFocusedItemId(focusItems[previousIndex]);
                } else {
                    if (loop) {
                        setFocusedItemId(focusItems[focusItems.length - 1]);
                    }
                }
            }
            break;
        }
        case 'ArrowLeft': {
            if (direction === 'horizontal') {
                // Logic to move focus to the previous item
                const previousIndex = focusItems.indexOf(id) - 1;
                if (previousIndex >= 0) {
                    setFocusedItemId(focusItems[previousIndex]);
                } else {
                    if (loop) {
                        setFocusedItemId(focusItems[focusItems.length - 1]);
                    }
                }
            }
            break;
        }
        case 'ArrowDown': {
            if (direction === 'vertical') {
                // Logic to move focus to the next item
                const nextIndex = focusItems.indexOf(id) + 1;
                if (nextIndex < focusItems.length) {
                    setFocusedItemId(focusItems[nextIndex]);
                } else {
                    if (loop) {
                        setFocusedItemId(focusItems[0]);
                    }
                }
            }
            break;
        }
        case 'ArrowRight': {
            if (direction === 'horizontal') {
                // Check if it's not the last item before moving focus to the next item
                const nextIndex = focusItems.indexOf(id) + 1;
                if (nextIndex < focusItems.length) {
                    setFocusedItemId(focusItems[nextIndex]);
                } else {
                    if (loop) {
                        setFocusedItemId(focusItems[0]);
                    }
                }
            }
            break;
        }
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
