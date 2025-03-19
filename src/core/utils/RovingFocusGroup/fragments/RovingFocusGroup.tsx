import React, { useEffect, useState, useId, useRef } from 'react';
import Primitive from '~/core/primitives/Primitive';

import { RovingFocusGroupContext, RovingFocusGroupContextTypes } from '../context/RovingFocusGroupContext';

type RovingFocusGroupProps = {
    children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const RovingFocusGroup = ({ children, ...props }: RovingFocusGroupProps) => {
    const groupRef = useRef<HTMLDivElement>(null);
    const [focusItems, setFocusItems] = useState<string[]>([]);
    const [focusedItemId, setFocusedItemId] = useState<string | null>(null);
    const groupId = useId();

    const addFocusItem = (id: string) => {
        setFocusItems((prev) => [...prev, id]);
    };

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
