import React from 'react';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import ContextMenuContext from '../contexts/ContextMenuContext';

export type ContextMenuPortalProps = {
  children: React.ReactNode;
}

const ContextMenuPortal = ({ children, ...props }:ContextMenuPortalProps) => {
    const context = React.useContext(ContextMenuContext);
    if (!context) {
        console.log('ContextMenuPortal should be used in the ContextMenuRoot');
        return null;
    }
    const { rootClass } = context;
    return (
        <MenuPrimitive.Portal {...props}>
            {children}
        </MenuPrimitive.Portal>
    );
};

export default ContextMenuPortal;
