import React from 'react';

const HoverCardTrigger = ({ children, ...props }) => {
    return <button onClick={props.onClick}>{children}</button>;
};

export default HoverCardTrigger;
