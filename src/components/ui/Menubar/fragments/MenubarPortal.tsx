import React from 'react';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import MenubarContext from '../contexts/MenubarContext';

export type MenubarPortalProps = {
  children: React.ReactNode;
}

const MenubarPortal = ({ children }:MenubarPortalProps) => {
    const context = React.useContext(MenubarContext);
    if (!context) {
        console.log('MenubarPortal should be used in the MenubarRoot');
        return null;
    }
    const { rootClass } = context;
    return (
        <MenuPrimitive.Portal>
            {children}
        </MenuPrimitive.Portal>
    );
};

export default MenubarPortal;
