import React from 'react';

const MenuContent = ({ children, ...props }: MenuContentProps) => {
    return <div {...props}>{children}</div>;
};

export default MenuContent;
