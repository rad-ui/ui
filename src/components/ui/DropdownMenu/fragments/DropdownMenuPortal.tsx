import React from 'react';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import DropdownMenuContext from '../contexts/DropdownMenuContext';

export type DropdownMenuPortalProps = {
  children: React.ReactNode;
}

const DropdownMenuPortal = ({ children }:DropdownMenuPortalProps) => {
    const context = React.useContext(DropdownMenuContext);
    if (!context) {
        console.log('DropdownMenuPortal should be used in the DropdownMenuRoot');
        return null;
    }
    const { rootClass } = context;
    return (
        <MenuPrimitive.Portal>
            {children}
        </MenuPrimitive.Portal>
    );
};

export default DropdownMenuPortal;
