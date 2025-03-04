import React from 'react';

import Primitive from '~/core/primitives/Primitive';

const RovingFocusItem = ({ children, ...props }: { children: React.ReactNode }) => {
    return <Primitive.span {...props}>
        {children}
    </Primitive.span>;
};

export default RovingFocusItem;
