import React from 'react';

import Primitive from '~/core/primitives/Primitive';

import { RovingFocusRootContext, RovingFocusRootContextTypes } from '../context/RovingFocusRootContext';

type RovingFocusRootProps = {
    children: React.ReactNode;
    direction?: 'horizontal' | 'vertical';
    loop?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const RovingFocusRoot = ({ children, direction = 'horizontal', loop = true, ...props }: RovingFocusRootProps) => {
    const sendValues: RovingFocusRootContextTypes = {
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
