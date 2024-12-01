import React from 'react';

type HoverCardPortalProps = {
    children: React.ReactNode,
    props: React.HTMLAttributes<HTMLElement>
}

const HoverCardPortal = ({ children, ...props }: HoverCardPortalProps) => {
    return <div {...props}>{children}</div>;
};

export default HoverCardPortal;
