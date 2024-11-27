import React from 'react';

const HoverCardPortal = ({ children, ...props }) => {
    return <div {...props}>{children}</div>;
};

export default HoverCardPortal;
