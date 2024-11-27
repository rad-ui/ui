import React from 'react';

const HoverCardContent = ({ children, ...props }) => {
    return <div {...props}>{children}</div>;
};

export default HoverCardContent;
