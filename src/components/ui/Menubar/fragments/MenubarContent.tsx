import React from 'react';
import MenuPrimitive, { MenuPrimitiveProps } from '~/core/primitives/Menu/MenuPrimitive';
import MenubarContext from '../contexts/MenubarContext';
import clsx from 'clsx';

export type MenubarContentProps = {
  children: React.ReactNode;
  className?: string;
} & MenuPrimitiveProps.Content;

const MenubarContent = ({ children, className, ...props }:MenubarContentProps) => {
    const context = React.useContext(MenubarContext);
    if (!context) {
        console.log('MenubarContent should be used in the MenubarRoot');
        return null;
    }
    const { rootClass } = context;
    return (
        <MenuPrimitive.Content className={clsx(`${rootClass}-content`, className)} {...props}>
            {children}
        </MenuPrimitive.Content>
    );
};

export default MenubarContent;
