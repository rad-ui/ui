import React from 'react';

import Primitive from '~/core/primitives/Primitive';

import { RovingFocusRootContext } from '../context/RovingFocusRootContext';

const RovingFocusRoot = ({ children, direction = 'horizontal', loop = true, ...props }: { children: React.ReactNode, direction?: 'horizontal' | 'vertical', loop?: boolean }) => {
    const sendValues = {
        direction,
        loop
    };

    return <RovingFocusRootContext.Provider value={sendValues}>
        <Primitive.div {...props}>
            {children}
        </Primitive.div>
    </RovingFocusRootContext.Provider>;
};

export default RovingFocusRoot;
