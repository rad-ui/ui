import React, { forwardRef, useContext, useEffect, useId, useRef } from 'react';

import Primitive from '~/core/primitives/Primitive';

import { RovingFocusGroupContext, RovingFocusGroupContextTypes } from '../context/RovingFocusGroupContext';
import { RovingFocusRootContext, RovingFocusRootContextTypes } from '../context/RovingFocusRootContext';

type RovingFocusItemProps = {
    children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const RovingFocusItem = forwardRef<HTMLButtonElement, RovingFocusItemProps>(({ children, ...props }, ref) => {
    const id = useId();
    const { focusedItemId, setFocusedItemId, addFocusItem, focusItems, groupRef } = useContext<RovingFocusGroupContextTypes>(RovingFocusGroupContext);
    const { direction, loop } = useContext<RovingFocusRootContextTypes>(RovingFocusRootContext);

    useEffect(() => {
        // we check if the item is in the focusItems array, if not we add it
        if (!focusItems.includes(id)) {
            addFocusItem(id);
        }

        //

        //
    }, [focusItems, focusedItemId]);

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

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        switch (event.key) {
        case 'ArrowUp': {
            // Prevent default to stop page scrolling
            event.preventDefault();

            if (direction === 'vertical') {
                // Logic to move focus to the previous item
                const previousIndex = focusItems.indexOf(id) - 1;
                if (previousIndex >= 0) {
                    focusItemWithId(focusItems[previousIndex]);
                } else {
                    if (loop) {
                        focusItemWithId(focusItems[focusItems.length - 1]);
                    }
                }
            }
            break;
        }
        case 'ArrowLeft': {
            // Prevent default to stop container scrolling
            event.preventDefault();

            if (direction === 'horizontal') {
                // Logic to move focus to the previous item
                const previousIndex = focusItems.indexOf(id) - 1;
                if (previousIndex >= 0) {
                    focusItemWithId(focusItems[previousIndex]);
                } else {
                    if (loop) {
                        focusItemWithId(focusItems[focusItems.length - 1]);
                    }
                }
            }
            break;
        }
        case 'ArrowDown': {
            // Prevent default to stop page scrolling
            event.preventDefault();

            if (direction === 'vertical') {
                // Logic to move focus to the next item
                const nextIndex = focusItems.indexOf(id) + 1;
                if (nextIndex < focusItems.length) {
                    focusItemWithId(focusItems[nextIndex]);
                } else {
                    if (loop) {
                        focusItemWithId(focusItems[0]);
                    }
                }
            }
            break;
        }
        case 'ArrowRight': {
            // Prevent default to stop container scrolling
            event.preventDefault();

            if (direction === 'horizontal') {
                // Check if it's not the last item before moving focus to the next item
                const nextIndex = focusItems.indexOf(id) + 1;
                if (nextIndex < focusItems.length) {
                    focusItemWithId(focusItems[nextIndex]);
                } else {
                    if (loop) {
                        focusItemWithId(focusItems[0]);
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
