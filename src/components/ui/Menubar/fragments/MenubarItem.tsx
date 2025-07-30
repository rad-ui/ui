import React from 'react';
import MenuPrimitive, { MenuPrimitiveProps } from '~/core/primitives/Menu/MenuPrimitive';
import MenubarContext from '../contexts/MenubarContext';
import clsx from 'clsx';

export type MenubarItemProps = {
  children: React.ReactNode;
  className?: string;
  label?: string;
} & MenuPrimitiveProps.Item;

const MenubarItem = ({ children, className, label }:MenubarItemProps) => {
    const context = React.useContext(MenubarContext);
    if (!context) {
        console.log('MenubarItem should be used in the MenubarRoot');
        return null;
    }
    const { rootClass } = context;
    return (
        <MenuPrimitive.Item className={clsx(`${rootClass}-item`, className)} label={label}>
            {children}
        </MenuPrimitive.Item>
    );
};

export default MenubarItem;
