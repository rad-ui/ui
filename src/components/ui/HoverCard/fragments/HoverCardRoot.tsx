import React from 'react';

const HoverCardRoot = ({ children, ...props }) => {
    return <div {...props}>{children}</div>;
};

export default HoverCardRoot;
