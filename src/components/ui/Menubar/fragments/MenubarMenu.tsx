import React from 'react';
import MenuPrimitive, { MenuPrimitiveProps } from '~/core/primitives/Menu/MenuPrimitive';
import { customClassSwitcher } from '~/core';
import clsx from 'clsx';
import MenubarContext from '../contexts/MenubarContext';
import Floater from '~/core/primitives/Floater';

export type MenubarMenuProps = {
  children: React.ReactNode;
  className?: string;
} & MenuPrimitiveProps.Root;

const MenubarMenu = ({ children, className }:MenubarMenuProps) => {
    const context = React.useContext(MenubarContext);
    if (!context) {
        console.log('MenubarMenu should be used in the MenubarRoot');
        return null;
    }
    const { rootClass } = context;
    return (

        <MenuPrimitive.Root className={clsx(`${rootClass}-menu`, className)}>
            {children}
        </MenuPrimitive.Root>

    );
};

export default MenubarMenu;
