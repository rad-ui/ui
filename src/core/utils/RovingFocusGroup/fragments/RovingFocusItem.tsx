import React, { forwardRef, useContext, useEffect, useId } from 'react';

import Primitive from '~/core/primitives/Primitive';

import { RovingFocusGroupContext } from '../context/RovingFocuGroupContext';

const RovingFocusItem = forwardRef<HTMLButtonElement, { children: React.ReactNode }>(({ children, ...props }, ref) => {
    const id = useId();
    const { focusedItemId, setFocusedItemId } = useContext(RovingFocusGroupContext);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        switch (event.key) {
        case 'ArrowUp':
        case 'ArrowLeft':
            // Logic to move focus to the previous item
            setFocusedItemId((prevId) => {
                // Implement logic to determine the previous item ID
                return prevId; // Replace with actual logic
            });
            break;
        case 'ArrowDown':
        case 'ArrowRight':
            // Logic to move focus to the next item
            setFocusedItemId((prevId) => {
                // Implement logic to determine the next item ID
                return prevId; // Replace with actual logic
            });
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
