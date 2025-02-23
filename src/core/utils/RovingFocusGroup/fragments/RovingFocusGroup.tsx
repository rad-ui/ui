import React from 'react';
import Primitive from '~/core/primitives/Primitive';

const RovingFocusGroup = ({ children, ...props }: { children: React.ReactNode }) => {
    return <Primitive.div {...props}>
        {children}
    </Primitive.div>;
};

export default RovingFocusGroup;
