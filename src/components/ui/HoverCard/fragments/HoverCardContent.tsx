import React, { useContext } from 'react';

import HoverCardContext from '../contexts/HoverCardContext';

const HoverCardContent = ({ children, ...props }) => {
    const { isOpen, floatingRefs, floatingStyles, getFloatingProps } = useContext(HoverCardContext);

    if (!isOpen) return null;
    return <div {...props} ref={floatingRefs.setFloating} style={floatingStyles} {...getFloatingProps()}>{children}</div>;
};

export default HoverCardContent;
