import React from 'react';
import MenuPrimitive, { MenuPrimitiveProps } from '~/core/primitives/Menu/MenuPrimitive';
import DropdownMenuContext from '../contexts/DropdownMenuContext';
import clsx from 'clsx';

export type DropdownMenuSubProps = {
  children: React.ReactNode;
  className?: string;
} & MenuPrimitiveProps.Sub;

const DropdownMenuSub = ({ children, className }:DropdownMenuSubProps) => {
    const context = React.useContext(DropdownMenuContext);
    if (!context) {
        console.log('DropdownMenuSub should be used in the DropdownMenuRoot');
        return null;
    }
    const { rootClass } = context;
    return (
        <MenuPrimitive.Sub className={clsx(`${rootClass}-sub`, className)}>
            {children}
        </MenuPrimitive.Sub>
    );
};

export default DropdownMenuSub;
