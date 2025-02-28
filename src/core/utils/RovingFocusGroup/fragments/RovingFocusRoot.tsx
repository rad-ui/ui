import React from 'react';

import Primitive from '~/core/primitives/Primitive';

const RovingFocusRoot = ({ children, ...props }: { children: React.ReactNodex }) => {
    return <Primitive.div {...props}>
        {children}
    </Primitive.div>;
};

export default RovingFocusRoot;
