import React from 'react';

const MenuTrigger = ({ children, ...props }: MenuTriggerProps) => {
    return <button {...props}>{children}</button>;
};

export default MenuTrigger;
