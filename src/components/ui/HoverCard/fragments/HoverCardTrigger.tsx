import React, { useContext } from 'react';

import HoverCardContext from '../contexts/HoverCardContext';

import Primitive from '~/core/primitives/Primitive';

const HoverCardTrigger = ({ children, ...props }) => {
    const { floatingRefs, closeWithDelay, openWithDelay } = useContext(HoverCardContext);

    return <>
        <Primitive.span
            onClick={() => {}}
            onMouseEnter={openWithDelay} onMouseLeave={closeWithDelay}
            ref={floatingRefs.setReference}
            asChild>{children}</Primitive.span>
    </>;
};

export default HoverCardTrigger;
