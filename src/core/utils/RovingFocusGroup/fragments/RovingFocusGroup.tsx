import React, { useEffect, useState } from 'react';
import Primitive from '~/core/primitives/Primitive';

import { RovingFocusGroupContext } from '../context/RovingFocuGroupContext';

const RovingFocusGroup = ({ children, ...props }: { children: React.ReactNode }) => {
    const [focusedItemId, setFocusedItemId] = useState<string | null>(null);

    return <RovingFocusGroupContext.Provider value={{ focusedItemId, setFocusedItemId }}>
        <Primitive.div {...props}>
            {children}
        </Primitive.div>
    </RovingFocusGroupContext.Provider>;
};

export default RovingFocusGroup;
